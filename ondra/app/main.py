from fastapi import FastAPI

app = FastAPI(title="ondra")


@app.get("/healthz", include_in_schema=False)
def healthz() -> dict[str, str]:
    return {"status": "ok"}
