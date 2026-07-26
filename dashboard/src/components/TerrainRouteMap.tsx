import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const ROUTE_SOURCE = "route";
const ROUTE_LAYER = "route-line";

const apiKey = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

function boundsOf(track: { lat: number; lng: number }[]) {
	const bounds = new maptilersdk.LngLatBounds();
	for (const point of track) bounds.extend([point.lng, point.lat]);
	return bounds;
}

export function TerrainRouteMap({
	track,
	marker,
}: {
	track: { lat: number; lng: number }[];
	marker?: { lat: number; lng: number } | null;
}) {
	const container = useRef<HTMLDivElement>(null);
	const mapRef = useRef<maptilersdk.Map | null>(null);
	const markerRef = useRef<maptilersdk.Marker | null>(null);

	useEffect(() => {
		if (!container.current || !apiKey) return;
		maptilersdk.config.apiKey = apiKey;

		const map = new maptilersdk.Map({
			container: container.current,
			style: maptilersdk.MapStyle.OUTDOOR,
			terrain: true,
			terrainExaggeration: 1,
			pitch: 70,
			bounds: boundsOf(track),
			fitBoundsOptions: { padding: 40 },
		});
		mapRef.current = map;

		map.on("load", () => {
			map.addSource(ROUTE_SOURCE, {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates: track.map((point) => [point.lng, point.lat]),
					},
				},
			});
			map.addLayer({
				id: ROUTE_LAYER,
				type: "line",
				source: ROUTE_SOURCE,
				layout: { "line-cap": "round", "line-join": "round" },
				paint: {
					"line-color": "#7FB4CA",
					"line-width": 4,
					"line-opacity": 0.9,
				},
			});
		});

		return () => {
			markerRef.current?.remove();
			markerRef.current = null;
			map.remove();
			mapRef.current = null;
		};
	}, [track]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		if (!marker) {
			markerRef.current?.remove();
			markerRef.current = null;
			return;
		}
		if (!markerRef.current) {
			const element = document.createElement("div");
			element.style.cssText =
				"width:12px;height:12px;border-radius:9999px;background:#E46876;border:2px solid #fff;";
			markerRef.current = new maptilersdk.Marker({ element });
		}
		markerRef.current.setLngLat([marker.lng, marker.lat]).addTo(map);
	}, [marker]);

	if (!apiKey) {
		return (
			<div className="text-muted-foreground flex h-[280px] items-center justify-center text-sm">
				3D terrain unavailable: missing VITE_MAPTILER_KEY.
			</div>
		);
	}

	return <div ref={container} style={{ height: 280, width: "100%" }} />;
}
