/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: unknown; output: unknown; }
  date: { input: unknown; output: unknown; }
  float8: { input: unknown; output: unknown; }
  jsonb: { input: unknown; output: unknown; }
  numeric: { input: unknown; output: unknown; }
  timestamptz: { input: unknown; output: unknown; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type SyncResult = {
  __typename?: 'SyncResult';
  activities_created: Scalars['Int']['output'];
  activities_failed: Scalars['Int']['output'];
  activities_updated: Scalars['Int']['output'];
  errors: Array<Scalars['String']['output']>;
  hrv_created: Scalars['Int']['output'];
  hrv_updated: Scalars['Int']['output'];
  readiness_created: Scalars['Int']['output'];
  readiness_updated: Scalars['Int']['output'];
  sleep_created: Scalars['Int']['output'];
  sleep_updated: Scalars['Int']['output'];
  streams_written: Scalars['Int']['output'];
};

/** columns and relationships of "activities" */
export type Activities = {
  __typename?: 'activities';
  /** An array relationship */
  activity_streams: Array<Activity_Streams>;
  /** An aggregate relationship */
  activity_streams_aggregate: Activity_Streams_Aggregate;
  activity_type?: Maybe<Scalars['String']['output']>;
  avg_hr?: Maybe<Scalars['Int']['output']>;
  avg_power_w?: Maybe<Scalars['float8']['output']>;
  avg_speed_mps?: Maybe<Scalars['float8']['output']>;
  caffeine?: Maybe<Scalars['String']['output']>;
  calories?: Maybe<Scalars['Int']['output']>;
  distance_m?: Maybe<Scalars['float8']['output']>;
  duration_s?: Maybe<Scalars['float8']['output']>;
  effort?: Maybe<Scalars['Int']['output']>;
  elevation_gain_m?: Maybe<Scalars['float8']['output']>;
  feeling?: Maybe<Scalars['Int']['output']>;
  focus?: Maybe<Scalars['String']['output']>;
  food_after?: Maybe<Array<Scalars['String']['output']>>;
  food_during?: Maybe<Array<Scalars['String']['output']>>;
  garmin_activity_id: Scalars['bigint']['output'];
  hard_tries?: Maybe<Scalars['Int']['output']>;
  id: Scalars['bigint']['output'];
  max_hr?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_lng?: Maybe<Scalars['float8']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  strength_exercises?: Maybe<Scalars['jsonb']['output']>;
  subtype?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weather?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "activities" */
export type ActivitiesActivity_StreamsArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


/** columns and relationships of "activities" */
export type ActivitiesActivity_Streams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


/** columns and relationships of "activities" */
export type ActivitiesStrength_ExercisesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "activities" */
export type Activities_Aggregate = {
  __typename?: 'activities_aggregate';
  aggregate?: Maybe<Activities_Aggregate_Fields>;
  nodes: Array<Activities>;
};

/** aggregate fields of "activities" */
export type Activities_Aggregate_Fields = {
  __typename?: 'activities_aggregate_fields';
  avg?: Maybe<Activities_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Activities_Max_Fields>;
  min?: Maybe<Activities_Min_Fields>;
  stddev?: Maybe<Activities_Stddev_Fields>;
  stddev_pop?: Maybe<Activities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Activities_Stddev_Samp_Fields>;
  sum?: Maybe<Activities_Sum_Fields>;
  var_pop?: Maybe<Activities_Var_Pop_Fields>;
  var_samp?: Maybe<Activities_Var_Samp_Fields>;
  variance?: Maybe<Activities_Variance_Fields>;
};


/** aggregate fields of "activities" */
export type Activities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Activities_Append_Input = {
  strength_exercises?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type Activities_Avg_Fields = {
  __typename?: 'activities_avg_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "activities". All fields are combined with a logical 'AND'. */
export type Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Activities_Bool_Exp>>;
  _not?: InputMaybe<Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Activities_Bool_Exp>>;
  activity_streams?: InputMaybe<Activity_Streams_Bool_Exp>;
  activity_streams_aggregate?: InputMaybe<Activity_Streams_Aggregate_Bool_Exp>;
  activity_type?: InputMaybe<String_Comparison_Exp>;
  avg_hr?: InputMaybe<Int_Comparison_Exp>;
  avg_power_w?: InputMaybe<Float8_Comparison_Exp>;
  avg_speed_mps?: InputMaybe<Float8_Comparison_Exp>;
  caffeine?: InputMaybe<String_Comparison_Exp>;
  calories?: InputMaybe<Int_Comparison_Exp>;
  distance_m?: InputMaybe<Float8_Comparison_Exp>;
  duration_s?: InputMaybe<Float8_Comparison_Exp>;
  effort?: InputMaybe<Int_Comparison_Exp>;
  elevation_gain_m?: InputMaybe<Float8_Comparison_Exp>;
  feeling?: InputMaybe<Int_Comparison_Exp>;
  focus?: InputMaybe<String_Comparison_Exp>;
  food_after?: InputMaybe<String_Array_Comparison_Exp>;
  food_during?: InputMaybe<String_Array_Comparison_Exp>;
  garmin_activity_id?: InputMaybe<Bigint_Comparison_Exp>;
  hard_tries?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  max_hr?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  start_lat?: InputMaybe<Float8_Comparison_Exp>;
  start_lng?: InputMaybe<Float8_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  strength_exercises?: InputMaybe<Jsonb_Comparison_Exp>;
  subtype?: InputMaybe<String_Comparison_Exp>;
  synced_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weather?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "activities" */
export enum Activities_Constraint {
  /** unique or primary key constraint on columns "garmin_activity_id" */
  ActivitiesGarminActivityIdKey = 'activities_garmin_activity_id_key',
  /** unique or primary key constraint on columns "id" */
  ActivitiesPkey = 'activities_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Activities_Delete_At_Path_Input = {
  strength_exercises?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Activities_Delete_Elem_Input = {
  strength_exercises?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Activities_Delete_Key_Input = {
  strength_exercises?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "activities" */
export type Activities_Inc_Input = {
  avg_hr?: InputMaybe<Scalars['Int']['input']>;
  avg_power_w?: InputMaybe<Scalars['float8']['input']>;
  avg_speed_mps?: InputMaybe<Scalars['float8']['input']>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance_m?: InputMaybe<Scalars['float8']['input']>;
  duration_s?: InputMaybe<Scalars['float8']['input']>;
  effort?: InputMaybe<Scalars['Int']['input']>;
  elevation_gain_m?: InputMaybe<Scalars['float8']['input']>;
  feeling?: InputMaybe<Scalars['Int']['input']>;
  garmin_activity_id?: InputMaybe<Scalars['bigint']['input']>;
  hard_tries?: InputMaybe<Scalars['Int']['input']>;
  max_hr?: InputMaybe<Scalars['Int']['input']>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_lng?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "activities" */
export type Activities_Insert_Input = {
  activity_streams?: InputMaybe<Activity_Streams_Arr_Rel_Insert_Input>;
  activity_type?: InputMaybe<Scalars['String']['input']>;
  avg_hr?: InputMaybe<Scalars['Int']['input']>;
  avg_power_w?: InputMaybe<Scalars['float8']['input']>;
  avg_speed_mps?: InputMaybe<Scalars['float8']['input']>;
  caffeine?: InputMaybe<Scalars['String']['input']>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance_m?: InputMaybe<Scalars['float8']['input']>;
  duration_s?: InputMaybe<Scalars['float8']['input']>;
  effort?: InputMaybe<Scalars['Int']['input']>;
  elevation_gain_m?: InputMaybe<Scalars['float8']['input']>;
  feeling?: InputMaybe<Scalars['Int']['input']>;
  focus?: InputMaybe<Scalars['String']['input']>;
  food_after?: InputMaybe<Array<Scalars['String']['input']>>;
  food_during?: InputMaybe<Array<Scalars['String']['input']>>;
  garmin_activity_id?: InputMaybe<Scalars['bigint']['input']>;
  hard_tries?: InputMaybe<Scalars['Int']['input']>;
  max_hr?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_lng?: InputMaybe<Scalars['float8']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  strength_exercises?: InputMaybe<Scalars['jsonb']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weather?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Activities_Max_Fields = {
  __typename?: 'activities_max_fields';
  activity_type?: Maybe<Scalars['String']['output']>;
  avg_hr?: Maybe<Scalars['Int']['output']>;
  avg_power_w?: Maybe<Scalars['float8']['output']>;
  avg_speed_mps?: Maybe<Scalars['float8']['output']>;
  caffeine?: Maybe<Scalars['String']['output']>;
  calories?: Maybe<Scalars['Int']['output']>;
  distance_m?: Maybe<Scalars['float8']['output']>;
  duration_s?: Maybe<Scalars['float8']['output']>;
  effort?: Maybe<Scalars['Int']['output']>;
  elevation_gain_m?: Maybe<Scalars['float8']['output']>;
  feeling?: Maybe<Scalars['Int']['output']>;
  focus?: Maybe<Scalars['String']['output']>;
  food_after?: Maybe<Array<Scalars['String']['output']>>;
  food_during?: Maybe<Array<Scalars['String']['output']>>;
  garmin_activity_id?: Maybe<Scalars['bigint']['output']>;
  hard_tries?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_hr?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_lng?: Maybe<Scalars['float8']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  subtype?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weather?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Activities_Min_Fields = {
  __typename?: 'activities_min_fields';
  activity_type?: Maybe<Scalars['String']['output']>;
  avg_hr?: Maybe<Scalars['Int']['output']>;
  avg_power_w?: Maybe<Scalars['float8']['output']>;
  avg_speed_mps?: Maybe<Scalars['float8']['output']>;
  caffeine?: Maybe<Scalars['String']['output']>;
  calories?: Maybe<Scalars['Int']['output']>;
  distance_m?: Maybe<Scalars['float8']['output']>;
  duration_s?: Maybe<Scalars['float8']['output']>;
  effort?: Maybe<Scalars['Int']['output']>;
  elevation_gain_m?: Maybe<Scalars['float8']['output']>;
  feeling?: Maybe<Scalars['Int']['output']>;
  focus?: Maybe<Scalars['String']['output']>;
  food_after?: Maybe<Array<Scalars['String']['output']>>;
  food_during?: Maybe<Array<Scalars['String']['output']>>;
  garmin_activity_id?: Maybe<Scalars['bigint']['output']>;
  hard_tries?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_hr?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_lng?: Maybe<Scalars['float8']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  subtype?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weather?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "activities" */
export type Activities_Mutation_Response = {
  __typename?: 'activities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Activities>;
};

/** input type for inserting object relation for remote table "activities" */
export type Activities_Obj_Rel_Insert_Input = {
  data: Activities_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Activities_On_Conflict>;
};

/** on_conflict condition type for table "activities" */
export type Activities_On_Conflict = {
  constraint: Activities_Constraint;
  update_columns?: Array<Activities_Update_Column>;
  where?: InputMaybe<Activities_Bool_Exp>;
};

/** Ordering options when selecting data from "activities". */
export type Activities_Order_By = {
  activity_streams_aggregate?: InputMaybe<Activity_Streams_Aggregate_Order_By>;
  activity_type?: InputMaybe<Order_By>;
  avg_hr?: InputMaybe<Order_By>;
  avg_power_w?: InputMaybe<Order_By>;
  avg_speed_mps?: InputMaybe<Order_By>;
  caffeine?: InputMaybe<Order_By>;
  calories?: InputMaybe<Order_By>;
  distance_m?: InputMaybe<Order_By>;
  duration_s?: InputMaybe<Order_By>;
  effort?: InputMaybe<Order_By>;
  elevation_gain_m?: InputMaybe<Order_By>;
  feeling?: InputMaybe<Order_By>;
  focus?: InputMaybe<Order_By>;
  food_after?: InputMaybe<Order_By>;
  food_during?: InputMaybe<Order_By>;
  garmin_activity_id?: InputMaybe<Order_By>;
  hard_tries?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_hr?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  start_lat?: InputMaybe<Order_By>;
  start_lng?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  strength_exercises?: InputMaybe<Order_By>;
  subtype?: InputMaybe<Order_By>;
  synced_at?: InputMaybe<Order_By>;
  weather?: InputMaybe<Order_By>;
};

/** primary key columns input for table: activities */
export type Activities_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Activities_Prepend_Input = {
  strength_exercises?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "activities" */
export enum Activities_Select_Column {
  /** column name */
  ActivityType = 'activity_type',
  /** column name */
  AvgHr = 'avg_hr',
  /** column name */
  AvgPowerW = 'avg_power_w',
  /** column name */
  AvgSpeedMps = 'avg_speed_mps',
  /** column name */
  Caffeine = 'caffeine',
  /** column name */
  Calories = 'calories',
  /** column name */
  DistanceM = 'distance_m',
  /** column name */
  DurationS = 'duration_s',
  /** column name */
  Effort = 'effort',
  /** column name */
  ElevationGainM = 'elevation_gain_m',
  /** column name */
  Feeling = 'feeling',
  /** column name */
  Focus = 'focus',
  /** column name */
  FoodAfter = 'food_after',
  /** column name */
  FoodDuring = 'food_during',
  /** column name */
  GarminActivityId = 'garmin_activity_id',
  /** column name */
  HardTries = 'hard_tries',
  /** column name */
  Id = 'id',
  /** column name */
  MaxHr = 'max_hr',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  StartLat = 'start_lat',
  /** column name */
  StartLng = 'start_lng',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StrengthExercises = 'strength_exercises',
  /** column name */
  Subtype = 'subtype',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  Weather = 'weather'
}

/** input type for updating data in table "activities" */
export type Activities_Set_Input = {
  activity_type?: InputMaybe<Scalars['String']['input']>;
  avg_hr?: InputMaybe<Scalars['Int']['input']>;
  avg_power_w?: InputMaybe<Scalars['float8']['input']>;
  avg_speed_mps?: InputMaybe<Scalars['float8']['input']>;
  caffeine?: InputMaybe<Scalars['String']['input']>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance_m?: InputMaybe<Scalars['float8']['input']>;
  duration_s?: InputMaybe<Scalars['float8']['input']>;
  effort?: InputMaybe<Scalars['Int']['input']>;
  elevation_gain_m?: InputMaybe<Scalars['float8']['input']>;
  feeling?: InputMaybe<Scalars['Int']['input']>;
  focus?: InputMaybe<Scalars['String']['input']>;
  food_after?: InputMaybe<Array<Scalars['String']['input']>>;
  food_during?: InputMaybe<Array<Scalars['String']['input']>>;
  garmin_activity_id?: InputMaybe<Scalars['bigint']['input']>;
  hard_tries?: InputMaybe<Scalars['Int']['input']>;
  max_hr?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_lng?: InputMaybe<Scalars['float8']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  strength_exercises?: InputMaybe<Scalars['jsonb']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weather?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Activities_Stddev_Fields = {
  __typename?: 'activities_stddev_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Activities_Stddev_Pop_Fields = {
  __typename?: 'activities_stddev_pop_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Activities_Stddev_Samp_Fields = {
  __typename?: 'activities_stddev_samp_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "activities" */
export type Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Activities_Stream_Cursor_Value_Input = {
  activity_type?: InputMaybe<Scalars['String']['input']>;
  avg_hr?: InputMaybe<Scalars['Int']['input']>;
  avg_power_w?: InputMaybe<Scalars['float8']['input']>;
  avg_speed_mps?: InputMaybe<Scalars['float8']['input']>;
  caffeine?: InputMaybe<Scalars['String']['input']>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  distance_m?: InputMaybe<Scalars['float8']['input']>;
  duration_s?: InputMaybe<Scalars['float8']['input']>;
  effort?: InputMaybe<Scalars['Int']['input']>;
  elevation_gain_m?: InputMaybe<Scalars['float8']['input']>;
  feeling?: InputMaybe<Scalars['Int']['input']>;
  focus?: InputMaybe<Scalars['String']['input']>;
  food_after?: InputMaybe<Array<Scalars['String']['input']>>;
  food_during?: InputMaybe<Array<Scalars['String']['input']>>;
  garmin_activity_id?: InputMaybe<Scalars['bigint']['input']>;
  hard_tries?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  max_hr?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_lng?: InputMaybe<Scalars['float8']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  strength_exercises?: InputMaybe<Scalars['jsonb']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weather?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Activities_Sum_Fields = {
  __typename?: 'activities_sum_fields';
  avg_hr?: Maybe<Scalars['Int']['output']>;
  avg_power_w?: Maybe<Scalars['float8']['output']>;
  avg_speed_mps?: Maybe<Scalars['float8']['output']>;
  calories?: Maybe<Scalars['Int']['output']>;
  distance_m?: Maybe<Scalars['float8']['output']>;
  duration_s?: Maybe<Scalars['float8']['output']>;
  effort?: Maybe<Scalars['Int']['output']>;
  elevation_gain_m?: Maybe<Scalars['float8']['output']>;
  feeling?: Maybe<Scalars['Int']['output']>;
  garmin_activity_id?: Maybe<Scalars['bigint']['output']>;
  hard_tries?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_hr?: Maybe<Scalars['Int']['output']>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_lng?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "activities" */
export enum Activities_Update_Column {
  /** column name */
  ActivityType = 'activity_type',
  /** column name */
  AvgHr = 'avg_hr',
  /** column name */
  AvgPowerW = 'avg_power_w',
  /** column name */
  AvgSpeedMps = 'avg_speed_mps',
  /** column name */
  Caffeine = 'caffeine',
  /** column name */
  Calories = 'calories',
  /** column name */
  DistanceM = 'distance_m',
  /** column name */
  DurationS = 'duration_s',
  /** column name */
  Effort = 'effort',
  /** column name */
  ElevationGainM = 'elevation_gain_m',
  /** column name */
  Feeling = 'feeling',
  /** column name */
  Focus = 'focus',
  /** column name */
  FoodAfter = 'food_after',
  /** column name */
  FoodDuring = 'food_during',
  /** column name */
  GarminActivityId = 'garmin_activity_id',
  /** column name */
  HardTries = 'hard_tries',
  /** column name */
  MaxHr = 'max_hr',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  StartLat = 'start_lat',
  /** column name */
  StartLng = 'start_lng',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StrengthExercises = 'strength_exercises',
  /** column name */
  Subtype = 'subtype',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  Weather = 'weather'
}

export type Activities_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Activities_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Activities_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Activities_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Activities_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Activities_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Activities_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Activities_Set_Input>;
  /** filter the rows which have to be updated */
  where: Activities_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Activities_Var_Pop_Fields = {
  __typename?: 'activities_var_pop_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Activities_Var_Samp_Fields = {
  __typename?: 'activities_var_samp_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Activities_Variance_Fields = {
  __typename?: 'activities_variance_fields';
  avg_hr?: Maybe<Scalars['Float']['output']>;
  avg_power_w?: Maybe<Scalars['Float']['output']>;
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  distance_m?: Maybe<Scalars['Float']['output']>;
  duration_s?: Maybe<Scalars['Float']['output']>;
  effort?: Maybe<Scalars['Float']['output']>;
  elevation_gain_m?: Maybe<Scalars['Float']['output']>;
  feeling?: Maybe<Scalars['Float']['output']>;
  garmin_activity_id?: Maybe<Scalars['Float']['output']>;
  hard_tries?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_hr?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_lng?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "activity_streams" */
export type Activity_Streams = {
  __typename?: 'activity_streams';
  /** An object relationship */
  activity: Activities;
  activity_id: Scalars['bigint']['output'];
  id: Scalars['bigint']['output'];
  payload: Scalars['jsonb']['output'];
};


/** columns and relationships of "activity_streams" */
export type Activity_StreamsPayloadArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "activity_streams" */
export type Activity_Streams_Aggregate = {
  __typename?: 'activity_streams_aggregate';
  aggregate?: Maybe<Activity_Streams_Aggregate_Fields>;
  nodes: Array<Activity_Streams>;
};

export type Activity_Streams_Aggregate_Bool_Exp = {
  count?: InputMaybe<Activity_Streams_Aggregate_Bool_Exp_Count>;
};

export type Activity_Streams_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Activity_Streams_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "activity_streams" */
export type Activity_Streams_Aggregate_Fields = {
  __typename?: 'activity_streams_aggregate_fields';
  avg?: Maybe<Activity_Streams_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Activity_Streams_Max_Fields>;
  min?: Maybe<Activity_Streams_Min_Fields>;
  stddev?: Maybe<Activity_Streams_Stddev_Fields>;
  stddev_pop?: Maybe<Activity_Streams_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Activity_Streams_Stddev_Samp_Fields>;
  sum?: Maybe<Activity_Streams_Sum_Fields>;
  var_pop?: Maybe<Activity_Streams_Var_Pop_Fields>;
  var_samp?: Maybe<Activity_Streams_Var_Samp_Fields>;
  variance?: Maybe<Activity_Streams_Variance_Fields>;
};


/** aggregate fields of "activity_streams" */
export type Activity_Streams_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "activity_streams" */
export type Activity_Streams_Aggregate_Order_By = {
  avg?: InputMaybe<Activity_Streams_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Activity_Streams_Max_Order_By>;
  min?: InputMaybe<Activity_Streams_Min_Order_By>;
  stddev?: InputMaybe<Activity_Streams_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Activity_Streams_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Activity_Streams_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Activity_Streams_Sum_Order_By>;
  var_pop?: InputMaybe<Activity_Streams_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Activity_Streams_Var_Samp_Order_By>;
  variance?: InputMaybe<Activity_Streams_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Activity_Streams_Append_Input = {
  payload?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "activity_streams" */
export type Activity_Streams_Arr_Rel_Insert_Input = {
  data: Array<Activity_Streams_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Activity_Streams_On_Conflict>;
};

/** aggregate avg on columns */
export type Activity_Streams_Avg_Fields = {
  __typename?: 'activity_streams_avg_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "activity_streams" */
export type Activity_Streams_Avg_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "activity_streams". All fields are combined with a logical 'AND'. */
export type Activity_Streams_Bool_Exp = {
  _and?: InputMaybe<Array<Activity_Streams_Bool_Exp>>;
  _not?: InputMaybe<Activity_Streams_Bool_Exp>;
  _or?: InputMaybe<Array<Activity_Streams_Bool_Exp>>;
  activity?: InputMaybe<Activities_Bool_Exp>;
  activity_id?: InputMaybe<Bigint_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  payload?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "activity_streams" */
export enum Activity_Streams_Constraint {
  /** unique or primary key constraint on columns "activity_id" */
  ActivityStreamsActivityIdKey = 'activity_streams_activity_id_key',
  /** unique or primary key constraint on columns "id" */
  ActivityStreamsPkey = 'activity_streams_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Activity_Streams_Delete_At_Path_Input = {
  payload?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Activity_Streams_Delete_Elem_Input = {
  payload?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Activity_Streams_Delete_Key_Input = {
  payload?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "activity_streams" */
export type Activity_Streams_Inc_Input = {
  activity_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "activity_streams" */
export type Activity_Streams_Insert_Input = {
  activity?: InputMaybe<Activities_Obj_Rel_Insert_Input>;
  activity_id?: InputMaybe<Scalars['bigint']['input']>;
  payload?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate max on columns */
export type Activity_Streams_Max_Fields = {
  __typename?: 'activity_streams_max_fields';
  activity_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "activity_streams" */
export type Activity_Streams_Max_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Activity_Streams_Min_Fields = {
  __typename?: 'activity_streams_min_fields';
  activity_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "activity_streams" */
export type Activity_Streams_Min_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "activity_streams" */
export type Activity_Streams_Mutation_Response = {
  __typename?: 'activity_streams_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Activity_Streams>;
};

/** on_conflict condition type for table "activity_streams" */
export type Activity_Streams_On_Conflict = {
  constraint: Activity_Streams_Constraint;
  update_columns?: Array<Activity_Streams_Update_Column>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};

/** Ordering options when selecting data from "activity_streams". */
export type Activity_Streams_Order_By = {
  activity?: InputMaybe<Activities_Order_By>;
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
};

/** primary key columns input for table: activity_streams */
export type Activity_Streams_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Activity_Streams_Prepend_Input = {
  payload?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "activity_streams" */
export enum Activity_Streams_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload'
}

/** input type for updating data in table "activity_streams" */
export type Activity_Streams_Set_Input = {
  activity_id?: InputMaybe<Scalars['bigint']['input']>;
  payload?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate stddev on columns */
export type Activity_Streams_Stddev_Fields = {
  __typename?: 'activity_streams_stddev_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "activity_streams" */
export type Activity_Streams_Stddev_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activity_Streams_Stddev_Pop_Fields = {
  __typename?: 'activity_streams_stddev_pop_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "activity_streams" */
export type Activity_Streams_Stddev_Pop_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activity_Streams_Stddev_Samp_Fields = {
  __typename?: 'activity_streams_stddev_samp_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "activity_streams" */
export type Activity_Streams_Stddev_Samp_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "activity_streams" */
export type Activity_Streams_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Activity_Streams_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Activity_Streams_Stream_Cursor_Value_Input = {
  activity_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  payload?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate sum on columns */
export type Activity_Streams_Sum_Fields = {
  __typename?: 'activity_streams_sum_fields';
  activity_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "activity_streams" */
export type Activity_Streams_Sum_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "activity_streams" */
export enum Activity_Streams_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  Payload = 'payload'
}

export type Activity_Streams_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Activity_Streams_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Activity_Streams_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Activity_Streams_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Activity_Streams_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Activity_Streams_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Activity_Streams_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Activity_Streams_Set_Input>;
  /** filter the rows which have to be updated */
  where: Activity_Streams_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Activity_Streams_Var_Pop_Fields = {
  __typename?: 'activity_streams_var_pop_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "activity_streams" */
export type Activity_Streams_Var_Pop_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activity_Streams_Var_Samp_Fields = {
  __typename?: 'activity_streams_var_samp_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "activity_streams" */
export type Activity_Streams_Var_Samp_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Activity_Streams_Variance_Fields = {
  __typename?: 'activity_streams_variance_fields';
  activity_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "activity_streams" */
export type Activity_Streams_Variance_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "daily_hrv" */
export type Daily_Hrv = {
  __typename?: 'daily_hrv';
  baseline_balanced_low?: Maybe<Scalars['Int']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Int']['output']>;
  baseline_low_upper?: Maybe<Scalars['Int']['output']>;
  baseline_marker_value?: Maybe<Scalars['float8']['output']>;
  calendar_date: Scalars['date']['output'];
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  feedback_phrase?: Maybe<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  last_night_5min_high?: Maybe<Scalars['Int']['output']>;
  last_night_avg?: Maybe<Scalars['Int']['output']>;
  readings?: Maybe<Scalars['jsonb']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weekly_avg?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "daily_hrv" */
export type Daily_HrvReadingsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "daily_hrv" */
export type Daily_Hrv_Aggregate = {
  __typename?: 'daily_hrv_aggregate';
  aggregate?: Maybe<Daily_Hrv_Aggregate_Fields>;
  nodes: Array<Daily_Hrv>;
};

/** aggregate fields of "daily_hrv" */
export type Daily_Hrv_Aggregate_Fields = {
  __typename?: 'daily_hrv_aggregate_fields';
  avg?: Maybe<Daily_Hrv_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Daily_Hrv_Max_Fields>;
  min?: Maybe<Daily_Hrv_Min_Fields>;
  stddev?: Maybe<Daily_Hrv_Stddev_Fields>;
  stddev_pop?: Maybe<Daily_Hrv_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Daily_Hrv_Stddev_Samp_Fields>;
  sum?: Maybe<Daily_Hrv_Sum_Fields>;
  var_pop?: Maybe<Daily_Hrv_Var_Pop_Fields>;
  var_samp?: Maybe<Daily_Hrv_Var_Samp_Fields>;
  variance?: Maybe<Daily_Hrv_Variance_Fields>;
};


/** aggregate fields of "daily_hrv" */
export type Daily_Hrv_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Daily_Hrv_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Daily_Hrv_Append_Input = {
  readings?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type Daily_Hrv_Avg_Fields = {
  __typename?: 'daily_hrv_avg_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "daily_hrv". All fields are combined with a logical 'AND'. */
export type Daily_Hrv_Bool_Exp = {
  _and?: InputMaybe<Array<Daily_Hrv_Bool_Exp>>;
  _not?: InputMaybe<Daily_Hrv_Bool_Exp>;
  _or?: InputMaybe<Array<Daily_Hrv_Bool_Exp>>;
  baseline_balanced_low?: InputMaybe<Int_Comparison_Exp>;
  baseline_balanced_upper?: InputMaybe<Int_Comparison_Exp>;
  baseline_low_upper?: InputMaybe<Int_Comparison_Exp>;
  baseline_marker_value?: InputMaybe<Float8_Comparison_Exp>;
  calendar_date?: InputMaybe<Date_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  feedback_phrase?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  last_night_5min_high?: InputMaybe<Int_Comparison_Exp>;
  last_night_avg?: InputMaybe<Int_Comparison_Exp>;
  readings?: InputMaybe<Jsonb_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  synced_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weekly_avg?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "daily_hrv" */
export enum Daily_Hrv_Constraint {
  /** unique or primary key constraint on columns "calendar_date" */
  DailyHrvCalendarDateKey = 'daily_hrv_calendar_date_key',
  /** unique or primary key constraint on columns "id" */
  DailyHrvPkey = 'daily_hrv_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Daily_Hrv_Delete_At_Path_Input = {
  readings?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Daily_Hrv_Delete_Elem_Input = {
  readings?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Daily_Hrv_Delete_Key_Input = {
  readings?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "daily_hrv" */
export type Daily_Hrv_Inc_Input = {
  baseline_balanced_low?: InputMaybe<Scalars['Int']['input']>;
  baseline_balanced_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_low_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_marker_value?: InputMaybe<Scalars['float8']['input']>;
  last_night_5min_high?: InputMaybe<Scalars['Int']['input']>;
  last_night_avg?: InputMaybe<Scalars['Int']['input']>;
  weekly_avg?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "daily_hrv" */
export type Daily_Hrv_Insert_Input = {
  baseline_balanced_low?: InputMaybe<Scalars['Int']['input']>;
  baseline_balanced_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_low_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_marker_value?: InputMaybe<Scalars['float8']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  feedback_phrase?: InputMaybe<Scalars['String']['input']>;
  last_night_5min_high?: InputMaybe<Scalars['Int']['input']>;
  last_night_avg?: InputMaybe<Scalars['Int']['input']>;
  readings?: InputMaybe<Scalars['jsonb']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weekly_avg?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Daily_Hrv_Max_Fields = {
  __typename?: 'daily_hrv_max_fields';
  baseline_balanced_low?: Maybe<Scalars['Int']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Int']['output']>;
  baseline_low_upper?: Maybe<Scalars['Int']['output']>;
  baseline_marker_value?: Maybe<Scalars['float8']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  feedback_phrase?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  last_night_5min_high?: Maybe<Scalars['Int']['output']>;
  last_night_avg?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weekly_avg?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Daily_Hrv_Min_Fields = {
  __typename?: 'daily_hrv_min_fields';
  baseline_balanced_low?: Maybe<Scalars['Int']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Int']['output']>;
  baseline_low_upper?: Maybe<Scalars['Int']['output']>;
  baseline_marker_value?: Maybe<Scalars['float8']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  feedback_phrase?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  last_night_5min_high?: Maybe<Scalars['Int']['output']>;
  last_night_avg?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  weekly_avg?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "daily_hrv" */
export type Daily_Hrv_Mutation_Response = {
  __typename?: 'daily_hrv_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Daily_Hrv>;
};

/** on_conflict condition type for table "daily_hrv" */
export type Daily_Hrv_On_Conflict = {
  constraint: Daily_Hrv_Constraint;
  update_columns?: Array<Daily_Hrv_Update_Column>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};

/** Ordering options when selecting data from "daily_hrv". */
export type Daily_Hrv_Order_By = {
  baseline_balanced_low?: InputMaybe<Order_By>;
  baseline_balanced_upper?: InputMaybe<Order_By>;
  baseline_low_upper?: InputMaybe<Order_By>;
  baseline_marker_value?: InputMaybe<Order_By>;
  calendar_date?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  feedback_phrase?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_night_5min_high?: InputMaybe<Order_By>;
  last_night_avg?: InputMaybe<Order_By>;
  readings?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  synced_at?: InputMaybe<Order_By>;
  weekly_avg?: InputMaybe<Order_By>;
};

/** primary key columns input for table: daily_hrv */
export type Daily_Hrv_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Daily_Hrv_Prepend_Input = {
  readings?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "daily_hrv" */
export enum Daily_Hrv_Select_Column {
  /** column name */
  BaselineBalancedLow = 'baseline_balanced_low',
  /** column name */
  BaselineBalancedUpper = 'baseline_balanced_upper',
  /** column name */
  BaselineLowUpper = 'baseline_low_upper',
  /** column name */
  BaselineMarkerValue = 'baseline_marker_value',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  FeedbackPhrase = 'feedback_phrase',
  /** column name */
  Id = 'id',
  /** column name */
  LastNight_5minHigh = 'last_night_5min_high',
  /** column name */
  LastNightAvg = 'last_night_avg',
  /** column name */
  Readings = 'readings',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  WeeklyAvg = 'weekly_avg'
}

/** input type for updating data in table "daily_hrv" */
export type Daily_Hrv_Set_Input = {
  baseline_balanced_low?: InputMaybe<Scalars['Int']['input']>;
  baseline_balanced_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_low_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_marker_value?: InputMaybe<Scalars['float8']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  feedback_phrase?: InputMaybe<Scalars['String']['input']>;
  last_night_5min_high?: InputMaybe<Scalars['Int']['input']>;
  last_night_avg?: InputMaybe<Scalars['Int']['input']>;
  readings?: InputMaybe<Scalars['jsonb']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weekly_avg?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Daily_Hrv_Stddev_Fields = {
  __typename?: 'daily_hrv_stddev_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Daily_Hrv_Stddev_Pop_Fields = {
  __typename?: 'daily_hrv_stddev_pop_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Daily_Hrv_Stddev_Samp_Fields = {
  __typename?: 'daily_hrv_stddev_samp_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "daily_hrv" */
export type Daily_Hrv_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Daily_Hrv_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Daily_Hrv_Stream_Cursor_Value_Input = {
  baseline_balanced_low?: InputMaybe<Scalars['Int']['input']>;
  baseline_balanced_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_low_upper?: InputMaybe<Scalars['Int']['input']>;
  baseline_marker_value?: InputMaybe<Scalars['float8']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  feedback_phrase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  last_night_5min_high?: InputMaybe<Scalars['Int']['input']>;
  last_night_avg?: InputMaybe<Scalars['Int']['input']>;
  readings?: InputMaybe<Scalars['jsonb']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weekly_avg?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Daily_Hrv_Sum_Fields = {
  __typename?: 'daily_hrv_sum_fields';
  baseline_balanced_low?: Maybe<Scalars['Int']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Int']['output']>;
  baseline_low_upper?: Maybe<Scalars['Int']['output']>;
  baseline_marker_value?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  last_night_5min_high?: Maybe<Scalars['Int']['output']>;
  last_night_avg?: Maybe<Scalars['Int']['output']>;
  weekly_avg?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "daily_hrv" */
export enum Daily_Hrv_Update_Column {
  /** column name */
  BaselineBalancedLow = 'baseline_balanced_low',
  /** column name */
  BaselineBalancedUpper = 'baseline_balanced_upper',
  /** column name */
  BaselineLowUpper = 'baseline_low_upper',
  /** column name */
  BaselineMarkerValue = 'baseline_marker_value',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  FeedbackPhrase = 'feedback_phrase',
  /** column name */
  LastNight_5minHigh = 'last_night_5min_high',
  /** column name */
  LastNightAvg = 'last_night_avg',
  /** column name */
  Readings = 'readings',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  WeeklyAvg = 'weekly_avg'
}

export type Daily_Hrv_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Daily_Hrv_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Daily_Hrv_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Daily_Hrv_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Daily_Hrv_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Daily_Hrv_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Daily_Hrv_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Daily_Hrv_Set_Input>;
  /** filter the rows which have to be updated */
  where: Daily_Hrv_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Daily_Hrv_Var_Pop_Fields = {
  __typename?: 'daily_hrv_var_pop_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Daily_Hrv_Var_Samp_Fields = {
  __typename?: 'daily_hrv_var_samp_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Daily_Hrv_Variance_Fields = {
  __typename?: 'daily_hrv_variance_fields';
  baseline_balanced_low?: Maybe<Scalars['Float']['output']>;
  baseline_balanced_upper?: Maybe<Scalars['Float']['output']>;
  baseline_low_upper?: Maybe<Scalars['Float']['output']>;
  baseline_marker_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  last_night_5min_high?: Maybe<Scalars['Float']['output']>;
  last_night_avg?: Maybe<Scalars['Float']['output']>;
  weekly_avg?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "exercises" */
export type Exercises = {
  __typename?: 'exercises';
  categories: Array<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "exercises" */
export type Exercises_Aggregate = {
  __typename?: 'exercises_aggregate';
  aggregate?: Maybe<Exercises_Aggregate_Fields>;
  nodes: Array<Exercises>;
};

/** aggregate fields of "exercises" */
export type Exercises_Aggregate_Fields = {
  __typename?: 'exercises_aggregate_fields';
  avg?: Maybe<Exercises_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Exercises_Max_Fields>;
  min?: Maybe<Exercises_Min_Fields>;
  stddev?: Maybe<Exercises_Stddev_Fields>;
  stddev_pop?: Maybe<Exercises_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Exercises_Stddev_Samp_Fields>;
  sum?: Maybe<Exercises_Sum_Fields>;
  var_pop?: Maybe<Exercises_Var_Pop_Fields>;
  var_samp?: Maybe<Exercises_Var_Samp_Fields>;
  variance?: Maybe<Exercises_Variance_Fields>;
};


/** aggregate fields of "exercises" */
export type Exercises_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Exercises_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Exercises_Avg_Fields = {
  __typename?: 'exercises_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "exercises". All fields are combined with a logical 'AND'. */
export type Exercises_Bool_Exp = {
  _and?: InputMaybe<Array<Exercises_Bool_Exp>>;
  _not?: InputMaybe<Exercises_Bool_Exp>;
  _or?: InputMaybe<Array<Exercises_Bool_Exp>>;
  categories?: InputMaybe<String_Array_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "exercises" */
export enum Exercises_Constraint {
  /** unique or primary key constraint on columns  */
  ExercisesNameLowerKey = 'exercises_name_lower_key',
  /** unique or primary key constraint on columns "id" */
  ExercisesPkey = 'exercises_pkey'
}

/** input type for inserting data into table "exercises" */
export type Exercises_Insert_Input = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Exercises_Max_Fields = {
  __typename?: 'exercises_max_fields';
  categories?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Exercises_Min_Fields = {
  __typename?: 'exercises_min_fields';
  categories?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "exercises" */
export type Exercises_Mutation_Response = {
  __typename?: 'exercises_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Exercises>;
};

/** on_conflict condition type for table "exercises" */
export type Exercises_On_Conflict = {
  constraint: Exercises_Constraint;
  update_columns?: Array<Exercises_Update_Column>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};

/** Ordering options when selecting data from "exercises". */
export type Exercises_Order_By = {
  categories?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: exercises */
export type Exercises_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "exercises" */
export enum Exercises_Select_Column {
  /** column name */
  Categories = 'categories',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "exercises" */
export type Exercises_Set_Input = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Exercises_Stddev_Fields = {
  __typename?: 'exercises_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Exercises_Stddev_Pop_Fields = {
  __typename?: 'exercises_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Exercises_Stddev_Samp_Fields = {
  __typename?: 'exercises_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "exercises" */
export type Exercises_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Exercises_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Exercises_Stream_Cursor_Value_Input = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Exercises_Sum_Fields = {
  __typename?: 'exercises_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "exercises" */
export enum Exercises_Update_Column {
  /** column name */
  Categories = 'categories',
  /** column name */
  Name = 'name'
}

export type Exercises_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Exercises_Set_Input>;
  /** filter the rows which have to be updated */
  where: Exercises_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Exercises_Var_Pop_Fields = {
  __typename?: 'exercises_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Exercises_Var_Samp_Fields = {
  __typename?: 'exercises_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Exercises_Variance_Fields = {
  __typename?: 'exercises_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

/** columns and relationships of "food_options" */
export type Food_Options = {
  __typename?: 'food_options';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "food_options" */
export type Food_Options_Aggregate = {
  __typename?: 'food_options_aggregate';
  aggregate?: Maybe<Food_Options_Aggregate_Fields>;
  nodes: Array<Food_Options>;
};

/** aggregate fields of "food_options" */
export type Food_Options_Aggregate_Fields = {
  __typename?: 'food_options_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Food_Options_Max_Fields>;
  min?: Maybe<Food_Options_Min_Fields>;
};


/** aggregate fields of "food_options" */
export type Food_Options_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Options_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "food_options". All fields are combined with a logical 'AND'. */
export type Food_Options_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Options_Bool_Exp>>;
  _not?: InputMaybe<Food_Options_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Options_Bool_Exp>>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Food_Options_Max_Fields = {
  __typename?: 'food_options_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Food_Options_Min_Fields = {
  __typename?: 'food_options_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "food_options". */
export type Food_Options_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** select columns of table "food_options" */
export enum Food_Options_Select_Column {
  /** column name */
  Value = 'value'
}

/** Streaming cursor of the table "food_options" */
export type Food_Options_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Food_Options_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Food_Options_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "activities" */
  delete_activities?: Maybe<Activities_Mutation_Response>;
  /** delete single row from the table: "activities" */
  delete_activities_by_pk?: Maybe<Activities>;
  /** delete data from the table: "activity_streams" */
  delete_activity_streams?: Maybe<Activity_Streams_Mutation_Response>;
  /** delete single row from the table: "activity_streams" */
  delete_activity_streams_by_pk?: Maybe<Activity_Streams>;
  /** delete data from the table: "daily_hrv" */
  delete_daily_hrv?: Maybe<Daily_Hrv_Mutation_Response>;
  /** delete single row from the table: "daily_hrv" */
  delete_daily_hrv_by_pk?: Maybe<Daily_Hrv>;
  /** delete data from the table: "exercises" */
  delete_exercises?: Maybe<Exercises_Mutation_Response>;
  /** delete single row from the table: "exercises" */
  delete_exercises_by_pk?: Maybe<Exercises>;
  /** delete data from the table: "plan_requirements" */
  delete_plan_requirements?: Maybe<Plan_Requirements_Mutation_Response>;
  /** delete single row from the table: "plan_requirements" */
  delete_plan_requirements_by_pk?: Maybe<Plan_Requirements>;
  /** delete data from the table: "plan_workouts" */
  delete_plan_workouts?: Maybe<Plan_Workouts_Mutation_Response>;
  /** delete single row from the table: "plan_workouts" */
  delete_plan_workouts_by_pk?: Maybe<Plan_Workouts>;
  /** delete data from the table: "plans" */
  delete_plans?: Maybe<Plans_Mutation_Response>;
  /** delete single row from the table: "plans" */
  delete_plans_by_pk?: Maybe<Plans>;
  /** delete data from the table: "sleep" */
  delete_sleep?: Maybe<Sleep_Mutation_Response>;
  /** delete single row from the table: "sleep" */
  delete_sleep_by_pk?: Maybe<Sleep>;
  /** delete data from the table: "training_readiness" */
  delete_training_readiness?: Maybe<Training_Readiness_Mutation_Response>;
  /** delete single row from the table: "training_readiness" */
  delete_training_readiness_by_pk?: Maybe<Training_Readiness>;
  /** insert data into the table: "activities" */
  insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "activity_streams" */
  insert_activity_streams?: Maybe<Activity_Streams_Mutation_Response>;
  /** insert a single row into the table: "activity_streams" */
  insert_activity_streams_one?: Maybe<Activity_Streams>;
  /** insert data into the table: "daily_hrv" */
  insert_daily_hrv?: Maybe<Daily_Hrv_Mutation_Response>;
  /** insert a single row into the table: "daily_hrv" */
  insert_daily_hrv_one?: Maybe<Daily_Hrv>;
  /** insert data into the table: "exercises" */
  insert_exercises?: Maybe<Exercises_Mutation_Response>;
  /** insert a single row into the table: "exercises" */
  insert_exercises_one?: Maybe<Exercises>;
  /** insert data into the table: "plan_requirements" */
  insert_plan_requirements?: Maybe<Plan_Requirements_Mutation_Response>;
  /** insert a single row into the table: "plan_requirements" */
  insert_plan_requirements_one?: Maybe<Plan_Requirements>;
  /** insert data into the table: "plan_workouts" */
  insert_plan_workouts?: Maybe<Plan_Workouts_Mutation_Response>;
  /** insert a single row into the table: "plan_workouts" */
  insert_plan_workouts_one?: Maybe<Plan_Workouts>;
  /** insert data into the table: "plans" */
  insert_plans?: Maybe<Plans_Mutation_Response>;
  /** insert a single row into the table: "plans" */
  insert_plans_one?: Maybe<Plans>;
  /** insert data into the table: "sleep" */
  insert_sleep?: Maybe<Sleep_Mutation_Response>;
  /** insert a single row into the table: "sleep" */
  insert_sleep_one?: Maybe<Sleep>;
  /** insert data into the table: "training_readiness" */
  insert_training_readiness?: Maybe<Training_Readiness_Mutation_Response>;
  /** insert a single row into the table: "training_readiness" */
  insert_training_readiness_one?: Maybe<Training_Readiness>;
  /** Run one bounded sync. Omitted arguments use small defaults; values outside their documented positive bounds are rejected. */
  syncActivities: SyncResult;
  /** update data of the table: "activities" */
  update_activities?: Maybe<Activities_Mutation_Response>;
  /** update single row of the table: "activities" */
  update_activities_by_pk?: Maybe<Activities>;
  /** update multiples rows of table: "activities" */
  update_activities_many?: Maybe<Array<Maybe<Activities_Mutation_Response>>>;
  /** update data of the table: "activity_streams" */
  update_activity_streams?: Maybe<Activity_Streams_Mutation_Response>;
  /** update single row of the table: "activity_streams" */
  update_activity_streams_by_pk?: Maybe<Activity_Streams>;
  /** update multiples rows of table: "activity_streams" */
  update_activity_streams_many?: Maybe<Array<Maybe<Activity_Streams_Mutation_Response>>>;
  /** update data of the table: "daily_hrv" */
  update_daily_hrv?: Maybe<Daily_Hrv_Mutation_Response>;
  /** update single row of the table: "daily_hrv" */
  update_daily_hrv_by_pk?: Maybe<Daily_Hrv>;
  /** update multiples rows of table: "daily_hrv" */
  update_daily_hrv_many?: Maybe<Array<Maybe<Daily_Hrv_Mutation_Response>>>;
  /** update data of the table: "exercises" */
  update_exercises?: Maybe<Exercises_Mutation_Response>;
  /** update single row of the table: "exercises" */
  update_exercises_by_pk?: Maybe<Exercises>;
  /** update multiples rows of table: "exercises" */
  update_exercises_many?: Maybe<Array<Maybe<Exercises_Mutation_Response>>>;
  /** update data of the table: "plan_requirements" */
  update_plan_requirements?: Maybe<Plan_Requirements_Mutation_Response>;
  /** update single row of the table: "plan_requirements" */
  update_plan_requirements_by_pk?: Maybe<Plan_Requirements>;
  /** update multiples rows of table: "plan_requirements" */
  update_plan_requirements_many?: Maybe<Array<Maybe<Plan_Requirements_Mutation_Response>>>;
  /** update data of the table: "plan_workouts" */
  update_plan_workouts?: Maybe<Plan_Workouts_Mutation_Response>;
  /** update single row of the table: "plan_workouts" */
  update_plan_workouts_by_pk?: Maybe<Plan_Workouts>;
  /** update multiples rows of table: "plan_workouts" */
  update_plan_workouts_many?: Maybe<Array<Maybe<Plan_Workouts_Mutation_Response>>>;
  /** update data of the table: "plans" */
  update_plans?: Maybe<Plans_Mutation_Response>;
  /** update single row of the table: "plans" */
  update_plans_by_pk?: Maybe<Plans>;
  /** update multiples rows of table: "plans" */
  update_plans_many?: Maybe<Array<Maybe<Plans_Mutation_Response>>>;
  /** update data of the table: "sleep" */
  update_sleep?: Maybe<Sleep_Mutation_Response>;
  /** update single row of the table: "sleep" */
  update_sleep_by_pk?: Maybe<Sleep>;
  /** update multiples rows of table: "sleep" */
  update_sleep_many?: Maybe<Array<Maybe<Sleep_Mutation_Response>>>;
  /** update data of the table: "training_readiness" */
  update_training_readiness?: Maybe<Training_Readiness_Mutation_Response>;
  /** update single row of the table: "training_readiness" */
  update_training_readiness_by_pk?: Maybe<Training_Readiness>;
  /** update multiples rows of table: "training_readiness" */
  update_training_readiness_many?: Maybe<Array<Maybe<Training_Readiness_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ActivitiesArgs = {
  where: Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Activities_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Activity_StreamsArgs = {
  where: Activity_Streams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Activity_Streams_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Daily_HrvArgs = {
  where: Daily_Hrv_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Daily_Hrv_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ExercisesArgs = {
  where: Exercises_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Exercises_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Plan_RequirementsArgs = {
  where: Plan_Requirements_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plan_Requirements_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Plan_WorkoutsArgs = {
  where: Plan_Workouts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plan_Workouts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PlansArgs = {
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plans_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SleepArgs = {
  where: Sleep_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sleep_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Training_ReadinessArgs = {
  where: Training_Readiness_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Training_Readiness_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootInsert_ActivitiesArgs = {
  objects: Array<Activities_Insert_Input>;
  on_conflict?: InputMaybe<Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Activities_OneArgs = {
  object: Activities_Insert_Input;
  on_conflict?: InputMaybe<Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Activity_StreamsArgs = {
  objects: Array<Activity_Streams_Insert_Input>;
  on_conflict?: InputMaybe<Activity_Streams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Activity_Streams_OneArgs = {
  object: Activity_Streams_Insert_Input;
  on_conflict?: InputMaybe<Activity_Streams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Daily_HrvArgs = {
  objects: Array<Daily_Hrv_Insert_Input>;
  on_conflict?: InputMaybe<Daily_Hrv_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Daily_Hrv_OneArgs = {
  object: Daily_Hrv_Insert_Input;
  on_conflict?: InputMaybe<Daily_Hrv_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExercisesArgs = {
  objects: Array<Exercises_Insert_Input>;
  on_conflict?: InputMaybe<Exercises_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Exercises_OneArgs = {
  object: Exercises_Insert_Input;
  on_conflict?: InputMaybe<Exercises_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plan_RequirementsArgs = {
  objects: Array<Plan_Requirements_Insert_Input>;
  on_conflict?: InputMaybe<Plan_Requirements_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plan_Requirements_OneArgs = {
  object: Plan_Requirements_Insert_Input;
  on_conflict?: InputMaybe<Plan_Requirements_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plan_WorkoutsArgs = {
  objects: Array<Plan_Workouts_Insert_Input>;
  on_conflict?: InputMaybe<Plan_Workouts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plan_Workouts_OneArgs = {
  object: Plan_Workouts_Insert_Input;
  on_conflict?: InputMaybe<Plan_Workouts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlansArgs = {
  objects: Array<Plans_Insert_Input>;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plans_OneArgs = {
  object: Plans_Insert_Input;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SleepArgs = {
  objects: Array<Sleep_Insert_Input>;
  on_conflict?: InputMaybe<Sleep_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sleep_OneArgs = {
  object: Sleep_Insert_Input;
  on_conflict?: InputMaybe<Sleep_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Training_ReadinessArgs = {
  objects: Array<Training_Readiness_Insert_Input>;
  on_conflict?: InputMaybe<Training_Readiness_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Training_Readiness_OneArgs = {
  object: Training_Readiness_Insert_Input;
  on_conflict?: InputMaybe<Training_Readiness_On_Conflict>;
};


/** mutation root */
export type Mutation_RootSyncActivitiesArgs = {
  days?: Scalars['Int']['input'];
  maxActivities?: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootUpdate_ActivitiesArgs = {
  _append?: InputMaybe<Activities_Append_Input>;
  _delete_at_path?: InputMaybe<Activities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Activities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Activities_Delete_Key_Input>;
  _inc?: InputMaybe<Activities_Inc_Input>;
  _prepend?: InputMaybe<Activities_Prepend_Input>;
  _set?: InputMaybe<Activities_Set_Input>;
  where: Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Activities_By_PkArgs = {
  _append?: InputMaybe<Activities_Append_Input>;
  _delete_at_path?: InputMaybe<Activities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Activities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Activities_Delete_Key_Input>;
  _inc?: InputMaybe<Activities_Inc_Input>;
  _prepend?: InputMaybe<Activities_Prepend_Input>;
  _set?: InputMaybe<Activities_Set_Input>;
  pk_columns: Activities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Activities_ManyArgs = {
  updates: Array<Activities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Activity_StreamsArgs = {
  _append?: InputMaybe<Activity_Streams_Append_Input>;
  _delete_at_path?: InputMaybe<Activity_Streams_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Activity_Streams_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Activity_Streams_Delete_Key_Input>;
  _inc?: InputMaybe<Activity_Streams_Inc_Input>;
  _prepend?: InputMaybe<Activity_Streams_Prepend_Input>;
  _set?: InputMaybe<Activity_Streams_Set_Input>;
  where: Activity_Streams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Activity_Streams_By_PkArgs = {
  _append?: InputMaybe<Activity_Streams_Append_Input>;
  _delete_at_path?: InputMaybe<Activity_Streams_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Activity_Streams_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Activity_Streams_Delete_Key_Input>;
  _inc?: InputMaybe<Activity_Streams_Inc_Input>;
  _prepend?: InputMaybe<Activity_Streams_Prepend_Input>;
  _set?: InputMaybe<Activity_Streams_Set_Input>;
  pk_columns: Activity_Streams_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Activity_Streams_ManyArgs = {
  updates: Array<Activity_Streams_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Daily_HrvArgs = {
  _append?: InputMaybe<Daily_Hrv_Append_Input>;
  _delete_at_path?: InputMaybe<Daily_Hrv_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Daily_Hrv_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Daily_Hrv_Delete_Key_Input>;
  _inc?: InputMaybe<Daily_Hrv_Inc_Input>;
  _prepend?: InputMaybe<Daily_Hrv_Prepend_Input>;
  _set?: InputMaybe<Daily_Hrv_Set_Input>;
  where: Daily_Hrv_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Daily_Hrv_By_PkArgs = {
  _append?: InputMaybe<Daily_Hrv_Append_Input>;
  _delete_at_path?: InputMaybe<Daily_Hrv_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Daily_Hrv_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Daily_Hrv_Delete_Key_Input>;
  _inc?: InputMaybe<Daily_Hrv_Inc_Input>;
  _prepend?: InputMaybe<Daily_Hrv_Prepend_Input>;
  _set?: InputMaybe<Daily_Hrv_Set_Input>;
  pk_columns: Daily_Hrv_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Daily_Hrv_ManyArgs = {
  updates: Array<Daily_Hrv_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ExercisesArgs = {
  _set?: InputMaybe<Exercises_Set_Input>;
  where: Exercises_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Exercises_By_PkArgs = {
  _set?: InputMaybe<Exercises_Set_Input>;
  pk_columns: Exercises_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Exercises_ManyArgs = {
  updates: Array<Exercises_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_RequirementsArgs = {
  _inc?: InputMaybe<Plan_Requirements_Inc_Input>;
  _set?: InputMaybe<Plan_Requirements_Set_Input>;
  where: Plan_Requirements_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_Requirements_By_PkArgs = {
  _inc?: InputMaybe<Plan_Requirements_Inc_Input>;
  _set?: InputMaybe<Plan_Requirements_Set_Input>;
  pk_columns: Plan_Requirements_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_Requirements_ManyArgs = {
  updates: Array<Plan_Requirements_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_WorkoutsArgs = {
  _inc?: InputMaybe<Plan_Workouts_Inc_Input>;
  _set?: InputMaybe<Plan_Workouts_Set_Input>;
  where: Plan_Workouts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_Workouts_By_PkArgs = {
  _inc?: InputMaybe<Plan_Workouts_Inc_Input>;
  _set?: InputMaybe<Plan_Workouts_Set_Input>;
  pk_columns: Plan_Workouts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Plan_Workouts_ManyArgs = {
  updates: Array<Plan_Workouts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PlansArgs = {
  _set?: InputMaybe<Plans_Set_Input>;
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_By_PkArgs = {
  _set?: InputMaybe<Plans_Set_Input>;
  pk_columns: Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_ManyArgs = {
  updates: Array<Plans_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SleepArgs = {
  _inc?: InputMaybe<Sleep_Inc_Input>;
  _set?: InputMaybe<Sleep_Set_Input>;
  where: Sleep_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sleep_By_PkArgs = {
  _inc?: InputMaybe<Sleep_Inc_Input>;
  _set?: InputMaybe<Sleep_Set_Input>;
  pk_columns: Sleep_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sleep_ManyArgs = {
  updates: Array<Sleep_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Training_ReadinessArgs = {
  _inc?: InputMaybe<Training_Readiness_Inc_Input>;
  _set?: InputMaybe<Training_Readiness_Set_Input>;
  where: Training_Readiness_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Training_Readiness_By_PkArgs = {
  _inc?: InputMaybe<Training_Readiness_Inc_Input>;
  _set?: InputMaybe<Training_Readiness_Set_Input>;
  pk_columns: Training_Readiness_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Training_Readiness_ManyArgs = {
  updates: Array<Training_Readiness_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "plan_requirements" */
export type Plan_Requirements = {
  __typename?: 'plan_requirements';
  id: Scalars['bigint']['output'];
  metric: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  plan: Plans;
  plan_id: Scalars['bigint']['output'];
  sport?: Maybe<Scalars['String']['output']>;
  target: Scalars['numeric']['output'];
  week: Scalars['String']['output'];
};

/** aggregated selection of "plan_requirements" */
export type Plan_Requirements_Aggregate = {
  __typename?: 'plan_requirements_aggregate';
  aggregate?: Maybe<Plan_Requirements_Aggregate_Fields>;
  nodes: Array<Plan_Requirements>;
};

export type Plan_Requirements_Aggregate_Bool_Exp = {
  count?: InputMaybe<Plan_Requirements_Aggregate_Bool_Exp_Count>;
};

export type Plan_Requirements_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Plan_Requirements_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "plan_requirements" */
export type Plan_Requirements_Aggregate_Fields = {
  __typename?: 'plan_requirements_aggregate_fields';
  avg?: Maybe<Plan_Requirements_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Plan_Requirements_Max_Fields>;
  min?: Maybe<Plan_Requirements_Min_Fields>;
  stddev?: Maybe<Plan_Requirements_Stddev_Fields>;
  stddev_pop?: Maybe<Plan_Requirements_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Plan_Requirements_Stddev_Samp_Fields>;
  sum?: Maybe<Plan_Requirements_Sum_Fields>;
  var_pop?: Maybe<Plan_Requirements_Var_Pop_Fields>;
  var_samp?: Maybe<Plan_Requirements_Var_Samp_Fields>;
  variance?: Maybe<Plan_Requirements_Variance_Fields>;
};


/** aggregate fields of "plan_requirements" */
export type Plan_Requirements_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "plan_requirements" */
export type Plan_Requirements_Aggregate_Order_By = {
  avg?: InputMaybe<Plan_Requirements_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Plan_Requirements_Max_Order_By>;
  min?: InputMaybe<Plan_Requirements_Min_Order_By>;
  stddev?: InputMaybe<Plan_Requirements_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Plan_Requirements_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Plan_Requirements_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Plan_Requirements_Sum_Order_By>;
  var_pop?: InputMaybe<Plan_Requirements_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Plan_Requirements_Var_Samp_Order_By>;
  variance?: InputMaybe<Plan_Requirements_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "plan_requirements" */
export type Plan_Requirements_Arr_Rel_Insert_Input = {
  data: Array<Plan_Requirements_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Plan_Requirements_On_Conflict>;
};

/** aggregate avg on columns */
export type Plan_Requirements_Avg_Fields = {
  __typename?: 'plan_requirements_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "plan_requirements" */
export type Plan_Requirements_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "plan_requirements". All fields are combined with a logical 'AND'. */
export type Plan_Requirements_Bool_Exp = {
  _and?: InputMaybe<Array<Plan_Requirements_Bool_Exp>>;
  _not?: InputMaybe<Plan_Requirements_Bool_Exp>;
  _or?: InputMaybe<Array<Plan_Requirements_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  metric?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  plan?: InputMaybe<Plans_Bool_Exp>;
  plan_id?: InputMaybe<Bigint_Comparison_Exp>;
  sport?: InputMaybe<String_Comparison_Exp>;
  target?: InputMaybe<Numeric_Comparison_Exp>;
  week?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "plan_requirements" */
export enum Plan_Requirements_Constraint {
  /** unique or primary key constraint on columns "id" */
  PlanRequirementsPkey = 'plan_requirements_pkey'
}

/** input type for incrementing numeric columns in table "plan_requirements" */
export type Plan_Requirements_Inc_Input = {
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  target?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "plan_requirements" */
export type Plan_Requirements_Insert_Input = {
  metric?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Plans_Obj_Rel_Insert_Input>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['numeric']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Plan_Requirements_Max_Fields = {
  __typename?: 'plan_requirements_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  metric?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
  sport?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['numeric']['output']>;
  week?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "plan_requirements" */
export type Plan_Requirements_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Plan_Requirements_Min_Fields = {
  __typename?: 'plan_requirements_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  metric?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
  sport?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['numeric']['output']>;
  week?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "plan_requirements" */
export type Plan_Requirements_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "plan_requirements" */
export type Plan_Requirements_Mutation_Response = {
  __typename?: 'plan_requirements_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Plan_Requirements>;
};

/** on_conflict condition type for table "plan_requirements" */
export type Plan_Requirements_On_Conflict = {
  constraint: Plan_Requirements_Constraint;
  update_columns?: Array<Plan_Requirements_Update_Column>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};

/** Ordering options when selecting data from "plan_requirements". */
export type Plan_Requirements_Order_By = {
  id?: InputMaybe<Order_By>;
  metric?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  plan?: InputMaybe<Plans_Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** primary key columns input for table: plan_requirements */
export type Plan_Requirements_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "plan_requirements" */
export enum Plan_Requirements_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Metric = 'metric',
  /** column name */
  Notes = 'notes',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  Sport = 'sport',
  /** column name */
  Target = 'target',
  /** column name */
  Week = 'week'
}

/** input type for updating data in table "plan_requirements" */
export type Plan_Requirements_Set_Input = {
  metric?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['numeric']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Plan_Requirements_Stddev_Fields = {
  __typename?: 'plan_requirements_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "plan_requirements" */
export type Plan_Requirements_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Plan_Requirements_Stddev_Pop_Fields = {
  __typename?: 'plan_requirements_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "plan_requirements" */
export type Plan_Requirements_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Plan_Requirements_Stddev_Samp_Fields = {
  __typename?: 'plan_requirements_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "plan_requirements" */
export type Plan_Requirements_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "plan_requirements" */
export type Plan_Requirements_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Plan_Requirements_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Plan_Requirements_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  metric?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['numeric']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Plan_Requirements_Sum_Fields = {
  __typename?: 'plan_requirements_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
  target?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "plan_requirements" */
export type Plan_Requirements_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** update columns of table "plan_requirements" */
export enum Plan_Requirements_Update_Column {
  /** column name */
  Metric = 'metric',
  /** column name */
  Notes = 'notes',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  Sport = 'sport',
  /** column name */
  Target = 'target',
  /** column name */
  Week = 'week'
}

export type Plan_Requirements_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Plan_Requirements_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Plan_Requirements_Set_Input>;
  /** filter the rows which have to be updated */
  where: Plan_Requirements_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Plan_Requirements_Var_Pop_Fields = {
  __typename?: 'plan_requirements_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "plan_requirements" */
export type Plan_Requirements_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Plan_Requirements_Var_Samp_Fields = {
  __typename?: 'plan_requirements_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "plan_requirements" */
export type Plan_Requirements_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Plan_Requirements_Variance_Fields = {
  __typename?: 'plan_requirements_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
  target?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "plan_requirements" */
export type Plan_Requirements_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  target?: InputMaybe<Order_By>;
};

/** columns and relationships of "plan_workouts" */
export type Plan_Workouts = {
  __typename?: 'plan_workouts';
  day_of_week: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  /** An object relationship */
  plan: Plans;
  plan_id: Scalars['bigint']['output'];
  sport: Scalars['String']['output'];
  title: Scalars['String']['output'];
  week: Scalars['String']['output'];
};

/** aggregated selection of "plan_workouts" */
export type Plan_Workouts_Aggregate = {
  __typename?: 'plan_workouts_aggregate';
  aggregate?: Maybe<Plan_Workouts_Aggregate_Fields>;
  nodes: Array<Plan_Workouts>;
};

export type Plan_Workouts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Plan_Workouts_Aggregate_Bool_Exp_Count>;
};

export type Plan_Workouts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Plan_Workouts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "plan_workouts" */
export type Plan_Workouts_Aggregate_Fields = {
  __typename?: 'plan_workouts_aggregate_fields';
  avg?: Maybe<Plan_Workouts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Plan_Workouts_Max_Fields>;
  min?: Maybe<Plan_Workouts_Min_Fields>;
  stddev?: Maybe<Plan_Workouts_Stddev_Fields>;
  stddev_pop?: Maybe<Plan_Workouts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Plan_Workouts_Stddev_Samp_Fields>;
  sum?: Maybe<Plan_Workouts_Sum_Fields>;
  var_pop?: Maybe<Plan_Workouts_Var_Pop_Fields>;
  var_samp?: Maybe<Plan_Workouts_Var_Samp_Fields>;
  variance?: Maybe<Plan_Workouts_Variance_Fields>;
};


/** aggregate fields of "plan_workouts" */
export type Plan_Workouts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "plan_workouts" */
export type Plan_Workouts_Aggregate_Order_By = {
  avg?: InputMaybe<Plan_Workouts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Plan_Workouts_Max_Order_By>;
  min?: InputMaybe<Plan_Workouts_Min_Order_By>;
  stddev?: InputMaybe<Plan_Workouts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Plan_Workouts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Plan_Workouts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Plan_Workouts_Sum_Order_By>;
  var_pop?: InputMaybe<Plan_Workouts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Plan_Workouts_Var_Samp_Order_By>;
  variance?: InputMaybe<Plan_Workouts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "plan_workouts" */
export type Plan_Workouts_Arr_Rel_Insert_Input = {
  data: Array<Plan_Workouts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Plan_Workouts_On_Conflict>;
};

/** aggregate avg on columns */
export type Plan_Workouts_Avg_Fields = {
  __typename?: 'plan_workouts_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "plan_workouts" */
export type Plan_Workouts_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "plan_workouts". All fields are combined with a logical 'AND'. */
export type Plan_Workouts_Bool_Exp = {
  _and?: InputMaybe<Array<Plan_Workouts_Bool_Exp>>;
  _not?: InputMaybe<Plan_Workouts_Bool_Exp>;
  _or?: InputMaybe<Array<Plan_Workouts_Bool_Exp>>;
  day_of_week?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  plan?: InputMaybe<Plans_Bool_Exp>;
  plan_id?: InputMaybe<Bigint_Comparison_Exp>;
  sport?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  week?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "plan_workouts" */
export enum Plan_Workouts_Constraint {
  /** unique or primary key constraint on columns "id" */
  PlanWorkoutsPkey = 'plan_workouts_pkey'
}

/** input type for incrementing numeric columns in table "plan_workouts" */
export type Plan_Workouts_Inc_Input = {
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "plan_workouts" */
export type Plan_Workouts_Insert_Input = {
  day_of_week?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Plans_Obj_Rel_Insert_Input>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Plan_Workouts_Max_Fields = {
  __typename?: 'plan_workouts_max_fields';
  day_of_week?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
  sport?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  week?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "plan_workouts" */
export type Plan_Workouts_Max_Order_By = {
  day_of_week?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Plan_Workouts_Min_Fields = {
  __typename?: 'plan_workouts_min_fields';
  day_of_week?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
  sport?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  week?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "plan_workouts" */
export type Plan_Workouts_Min_Order_By = {
  day_of_week?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "plan_workouts" */
export type Plan_Workouts_Mutation_Response = {
  __typename?: 'plan_workouts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Plan_Workouts>;
};

/** on_conflict condition type for table "plan_workouts" */
export type Plan_Workouts_On_Conflict = {
  constraint: Plan_Workouts_Constraint;
  update_columns?: Array<Plan_Workouts_Update_Column>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};

/** Ordering options when selecting data from "plan_workouts". */
export type Plan_Workouts_Order_By = {
  day_of_week?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  plan?: InputMaybe<Plans_Order_By>;
  plan_id?: InputMaybe<Order_By>;
  sport?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  week?: InputMaybe<Order_By>;
};

/** primary key columns input for table: plan_workouts */
export type Plan_Workouts_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "plan_workouts" */
export enum Plan_Workouts_Select_Column {
  /** column name */
  DayOfWeek = 'day_of_week',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  Sport = 'sport',
  /** column name */
  Title = 'title',
  /** column name */
  Week = 'week'
}

/** input type for updating data in table "plan_workouts" */
export type Plan_Workouts_Set_Input = {
  day_of_week?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Plan_Workouts_Stddev_Fields = {
  __typename?: 'plan_workouts_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "plan_workouts" */
export type Plan_Workouts_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Plan_Workouts_Stddev_Pop_Fields = {
  __typename?: 'plan_workouts_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "plan_workouts" */
export type Plan_Workouts_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Plan_Workouts_Stddev_Samp_Fields = {
  __typename?: 'plan_workouts_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "plan_workouts" */
export type Plan_Workouts_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "plan_workouts" */
export type Plan_Workouts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Plan_Workouts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Plan_Workouts_Stream_Cursor_Value_Input = {
  day_of_week?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  plan_id?: InputMaybe<Scalars['bigint']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Plan_Workouts_Sum_Fields = {
  __typename?: 'plan_workouts_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  plan_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "plan_workouts" */
export type Plan_Workouts_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** update columns of table "plan_workouts" */
export enum Plan_Workouts_Update_Column {
  /** column name */
  DayOfWeek = 'day_of_week',
  /** column name */
  Description = 'description',
  /** column name */
  PlanId = 'plan_id',
  /** column name */
  Sport = 'sport',
  /** column name */
  Title = 'title',
  /** column name */
  Week = 'week'
}

export type Plan_Workouts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Plan_Workouts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Plan_Workouts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Plan_Workouts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Plan_Workouts_Var_Pop_Fields = {
  __typename?: 'plan_workouts_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "plan_workouts" */
export type Plan_Workouts_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Plan_Workouts_Var_Samp_Fields = {
  __typename?: 'plan_workouts_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "plan_workouts" */
export type Plan_Workouts_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Plan_Workouts_Variance_Fields = {
  __typename?: 'plan_workouts_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  plan_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "plan_workouts" */
export type Plan_Workouts_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  plan_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "plans" */
export type Plans = {
  __typename?: 'plans';
  end_week: Scalars['String']['output'];
  id: Scalars['bigint']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  requirements: Array<Plan_Requirements>;
  /** An aggregate relationship */
  requirements_aggregate: Plan_Requirements_Aggregate;
  start_week: Scalars['String']['output'];
  /** An array relationship */
  workouts: Array<Plan_Workouts>;
  /** An aggregate relationship */
  workouts_aggregate: Plan_Workouts_Aggregate;
};


/** columns and relationships of "plans" */
export type PlansRequirementsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansRequirements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansWorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


/** columns and relationships of "plans" */
export type PlansWorkouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};

/** aggregated selection of "plans" */
export type Plans_Aggregate = {
  __typename?: 'plans_aggregate';
  aggregate?: Maybe<Plans_Aggregate_Fields>;
  nodes: Array<Plans>;
};

/** aggregate fields of "plans" */
export type Plans_Aggregate_Fields = {
  __typename?: 'plans_aggregate_fields';
  avg?: Maybe<Plans_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Plans_Max_Fields>;
  min?: Maybe<Plans_Min_Fields>;
  stddev?: Maybe<Plans_Stddev_Fields>;
  stddev_pop?: Maybe<Plans_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Plans_Stddev_Samp_Fields>;
  sum?: Maybe<Plans_Sum_Fields>;
  var_pop?: Maybe<Plans_Var_Pop_Fields>;
  var_samp?: Maybe<Plans_Var_Samp_Fields>;
  variance?: Maybe<Plans_Variance_Fields>;
};


/** aggregate fields of "plans" */
export type Plans_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Plans_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Plans_Avg_Fields = {
  __typename?: 'plans_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "plans". All fields are combined with a logical 'AND'. */
export type Plans_Bool_Exp = {
  _and?: InputMaybe<Array<Plans_Bool_Exp>>;
  _not?: InputMaybe<Plans_Bool_Exp>;
  _or?: InputMaybe<Array<Plans_Bool_Exp>>;
  end_week?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  requirements?: InputMaybe<Plan_Requirements_Bool_Exp>;
  requirements_aggregate?: InputMaybe<Plan_Requirements_Aggregate_Bool_Exp>;
  start_week?: InputMaybe<String_Comparison_Exp>;
  workouts?: InputMaybe<Plan_Workouts_Bool_Exp>;
  workouts_aggregate?: InputMaybe<Plan_Workouts_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "plans" */
export enum Plans_Constraint {
  /** unique or primary key constraint on columns "id" */
  PlansPkey = 'plans_pkey'
}

/** input type for inserting data into table "plans" */
export type Plans_Insert_Input = {
  end_week?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Plan_Requirements_Arr_Rel_Insert_Input>;
  start_week?: InputMaybe<Scalars['String']['input']>;
  workouts?: InputMaybe<Plan_Workouts_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Plans_Max_Fields = {
  __typename?: 'plans_max_fields';
  end_week?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  start_week?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Plans_Min_Fields = {
  __typename?: 'plans_min_fields';
  end_week?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  start_week?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "plans" */
export type Plans_Mutation_Response = {
  __typename?: 'plans_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Plans>;
};

/** input type for inserting object relation for remote table "plans" */
export type Plans_Obj_Rel_Insert_Input = {
  data: Plans_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};

/** on_conflict condition type for table "plans" */
export type Plans_On_Conflict = {
  constraint: Plans_Constraint;
  update_columns?: Array<Plans_Update_Column>;
  where?: InputMaybe<Plans_Bool_Exp>;
};

/** Ordering options when selecting data from "plans". */
export type Plans_Order_By = {
  end_week?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  requirements_aggregate?: InputMaybe<Plan_Requirements_Aggregate_Order_By>;
  start_week?: InputMaybe<Order_By>;
  workouts_aggregate?: InputMaybe<Plan_Workouts_Aggregate_Order_By>;
};

/** primary key columns input for table: plans */
export type Plans_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "plans" */
export enum Plans_Select_Column {
  /** column name */
  EndWeek = 'end_week',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  StartWeek = 'start_week'
}

/** input type for updating data in table "plans" */
export type Plans_Set_Input = {
  end_week?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  start_week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Plans_Stddev_Fields = {
  __typename?: 'plans_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Plans_Stddev_Pop_Fields = {
  __typename?: 'plans_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Plans_Stddev_Samp_Fields = {
  __typename?: 'plans_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "plans" */
export type Plans_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Plans_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Plans_Stream_Cursor_Value_Input = {
  end_week?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  start_week?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Plans_Sum_Fields = {
  __typename?: 'plans_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "plans" */
export enum Plans_Update_Column {
  /** column name */
  EndWeek = 'end_week',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  StartWeek = 'start_week'
}

export type Plans_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Plans_Set_Input>;
  /** filter the rows which have to be updated */
  where: Plans_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Plans_Var_Pop_Fields = {
  __typename?: 'plans_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Plans_Var_Samp_Fields = {
  __typename?: 'plans_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Plans_Variance_Fields = {
  __typename?: 'plans_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "activities" */
  activities: Array<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  activities_by_pk?: Maybe<Activities>;
  /** An array relationship */
  activity_streams: Array<Activity_Streams>;
  /** An aggregate relationship */
  activity_streams_aggregate: Activity_Streams_Aggregate;
  /** fetch data from the table: "activity_streams" using primary key columns */
  activity_streams_by_pk?: Maybe<Activity_Streams>;
  /** fetch data from the table: "daily_hrv" */
  daily_hrv: Array<Daily_Hrv>;
  /** fetch aggregated fields from the table: "daily_hrv" */
  daily_hrv_aggregate: Daily_Hrv_Aggregate;
  /** fetch data from the table: "daily_hrv" using primary key columns */
  daily_hrv_by_pk?: Maybe<Daily_Hrv>;
  /** fetch data from the table: "exercises" */
  exercises: Array<Exercises>;
  /** fetch aggregated fields from the table: "exercises" */
  exercises_aggregate: Exercises_Aggregate;
  /** fetch data from the table: "exercises" using primary key columns */
  exercises_by_pk?: Maybe<Exercises>;
  /** fetch data from the table: "food_options" */
  food_options: Array<Food_Options>;
  /** fetch aggregated fields from the table: "food_options" */
  food_options_aggregate: Food_Options_Aggregate;
  /** fetch data from the table: "plan_requirements" */
  plan_requirements: Array<Plan_Requirements>;
  /** fetch aggregated fields from the table: "plan_requirements" */
  plan_requirements_aggregate: Plan_Requirements_Aggregate;
  /** fetch data from the table: "plan_requirements" using primary key columns */
  plan_requirements_by_pk?: Maybe<Plan_Requirements>;
  /** fetch data from the table: "plan_workouts" */
  plan_workouts: Array<Plan_Workouts>;
  /** fetch aggregated fields from the table: "plan_workouts" */
  plan_workouts_aggregate: Plan_Workouts_Aggregate;
  /** fetch data from the table: "plan_workouts" using primary key columns */
  plan_workouts_by_pk?: Maybe<Plan_Workouts>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** Service readiness marker. */
  service: Scalars['String']['output'];
  /** fetch data from the table: "sleep" */
  sleep: Array<Sleep>;
  /** fetch aggregated fields from the table: "sleep" */
  sleep_aggregate: Sleep_Aggregate;
  /** fetch data from the table: "sleep" using primary key columns */
  sleep_by_pk?: Maybe<Sleep>;
  /** fetch data from the table: "training_readiness" */
  training_readiness: Array<Training_Readiness>;
  /** fetch aggregated fields from the table: "training_readiness" */
  training_readiness_aggregate: Training_Readiness_Aggregate;
  /** fetch data from the table: "training_readiness" using primary key columns */
  training_readiness_by_pk?: Maybe<Training_Readiness>;
};


export type Query_RootActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activities_Order_By>>;
  where?: InputMaybe<Activities_Bool_Exp>;
};


export type Query_RootActivities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activities_Order_By>>;
  where?: InputMaybe<Activities_Bool_Exp>;
};


export type Query_RootActivities_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootActivity_StreamsArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


export type Query_RootActivity_Streams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


export type Query_RootActivity_Streams_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootDaily_HrvArgs = {
  distinct_on?: InputMaybe<Array<Daily_Hrv_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Daily_Hrv_Order_By>>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};


export type Query_RootDaily_Hrv_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Daily_Hrv_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Daily_Hrv_Order_By>>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};


export type Query_RootDaily_Hrv_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootExercisesArgs = {
  distinct_on?: InputMaybe<Array<Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercises_Order_By>>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};


export type Query_RootExercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercises_Order_By>>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};


export type Query_RootExercises_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootFood_OptionsArgs = {
  distinct_on?: InputMaybe<Array<Food_Options_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Food_Options_Order_By>>;
  where?: InputMaybe<Food_Options_Bool_Exp>;
};


export type Query_RootFood_Options_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Options_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Food_Options_Order_By>>;
  where?: InputMaybe<Food_Options_Bool_Exp>;
};


export type Query_RootPlan_RequirementsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


export type Query_RootPlan_Requirements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


export type Query_RootPlan_Requirements_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootPlan_WorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


export type Query_RootPlan_Workouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


export type Query_RootPlan_Workouts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Query_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Query_RootPlans_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootSleepArgs = {
  distinct_on?: InputMaybe<Array<Sleep_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sleep_Order_By>>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};


export type Query_RootSleep_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sleep_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sleep_Order_By>>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};


export type Query_RootSleep_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootTraining_ReadinessArgs = {
  distinct_on?: InputMaybe<Array<Training_Readiness_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Training_Readiness_Order_By>>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};


export type Query_RootTraining_Readiness_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Training_Readiness_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Training_Readiness_Order_By>>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};


export type Query_RootTraining_Readiness_By_PkArgs = {
  id: Scalars['bigint']['input'];
};

/** columns and relationships of "sleep" */
export type Sleep = {
  __typename?: 'sleep';
  avg_hrv?: Maybe<Scalars['float8']['output']>;
  awake_s?: Maybe<Scalars['Int']['output']>;
  calendar_date: Scalars['date']['output'];
  deep_sleep_s?: Maybe<Scalars['Int']['output']>;
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['bigint']['output'];
  light_sleep_s?: Maybe<Scalars['Int']['output']>;
  rem_sleep_s?: Maybe<Scalars['Int']['output']>;
  resting_hr?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  total_sleep_s?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "sleep" */
export type Sleep_Aggregate = {
  __typename?: 'sleep_aggregate';
  aggregate?: Maybe<Sleep_Aggregate_Fields>;
  nodes: Array<Sleep>;
};

/** aggregate fields of "sleep" */
export type Sleep_Aggregate_Fields = {
  __typename?: 'sleep_aggregate_fields';
  avg?: Maybe<Sleep_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sleep_Max_Fields>;
  min?: Maybe<Sleep_Min_Fields>;
  stddev?: Maybe<Sleep_Stddev_Fields>;
  stddev_pop?: Maybe<Sleep_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sleep_Stddev_Samp_Fields>;
  sum?: Maybe<Sleep_Sum_Fields>;
  var_pop?: Maybe<Sleep_Var_Pop_Fields>;
  var_samp?: Maybe<Sleep_Var_Samp_Fields>;
  variance?: Maybe<Sleep_Variance_Fields>;
};


/** aggregate fields of "sleep" */
export type Sleep_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sleep_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Sleep_Avg_Fields = {
  __typename?: 'sleep_avg_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "sleep". All fields are combined with a logical 'AND'. */
export type Sleep_Bool_Exp = {
  _and?: InputMaybe<Array<Sleep_Bool_Exp>>;
  _not?: InputMaybe<Sleep_Bool_Exp>;
  _or?: InputMaybe<Array<Sleep_Bool_Exp>>;
  avg_hrv?: InputMaybe<Float8_Comparison_Exp>;
  awake_s?: InputMaybe<Int_Comparison_Exp>;
  calendar_date?: InputMaybe<Date_Comparison_Exp>;
  deep_sleep_s?: InputMaybe<Int_Comparison_Exp>;
  end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  light_sleep_s?: InputMaybe<Int_Comparison_Exp>;
  rem_sleep_s?: InputMaybe<Int_Comparison_Exp>;
  resting_hr?: InputMaybe<Int_Comparison_Exp>;
  sleep_score?: InputMaybe<Int_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  synced_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  total_sleep_s?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "sleep" */
export enum Sleep_Constraint {
  /** unique or primary key constraint on columns "calendar_date" */
  SleepCalendarDateKey = 'sleep_calendar_date_key',
  /** unique or primary key constraint on columns "id" */
  SleepPkey = 'sleep_pkey'
}

/** input type for incrementing numeric columns in table "sleep" */
export type Sleep_Inc_Input = {
  avg_hrv?: InputMaybe<Scalars['float8']['input']>;
  awake_s?: InputMaybe<Scalars['Int']['input']>;
  deep_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  light_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  rem_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  resting_hr?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  total_sleep_s?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sleep" */
export type Sleep_Insert_Input = {
  avg_hrv?: InputMaybe<Scalars['float8']['input']>;
  awake_s?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  deep_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  light_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  rem_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  resting_hr?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  total_sleep_s?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Sleep_Max_Fields = {
  __typename?: 'sleep_max_fields';
  avg_hrv?: Maybe<Scalars['float8']['output']>;
  awake_s?: Maybe<Scalars['Int']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  deep_sleep_s?: Maybe<Scalars['Int']['output']>;
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  light_sleep_s?: Maybe<Scalars['Int']['output']>;
  rem_sleep_s?: Maybe<Scalars['Int']['output']>;
  resting_hr?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  total_sleep_s?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Sleep_Min_Fields = {
  __typename?: 'sleep_min_fields';
  avg_hrv?: Maybe<Scalars['float8']['output']>;
  awake_s?: Maybe<Scalars['Int']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  deep_sleep_s?: Maybe<Scalars['Int']['output']>;
  end_time?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  light_sleep_s?: Maybe<Scalars['Int']['output']>;
  rem_sleep_s?: Maybe<Scalars['Int']['output']>;
  resting_hr?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  total_sleep_s?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "sleep" */
export type Sleep_Mutation_Response = {
  __typename?: 'sleep_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sleep>;
};

/** on_conflict condition type for table "sleep" */
export type Sleep_On_Conflict = {
  constraint: Sleep_Constraint;
  update_columns?: Array<Sleep_Update_Column>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};

/** Ordering options when selecting data from "sleep". */
export type Sleep_Order_By = {
  avg_hrv?: InputMaybe<Order_By>;
  awake_s?: InputMaybe<Order_By>;
  calendar_date?: InputMaybe<Order_By>;
  deep_sleep_s?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  light_sleep_s?: InputMaybe<Order_By>;
  rem_sleep_s?: InputMaybe<Order_By>;
  resting_hr?: InputMaybe<Order_By>;
  sleep_score?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  synced_at?: InputMaybe<Order_By>;
  total_sleep_s?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sleep */
export type Sleep_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "sleep" */
export enum Sleep_Select_Column {
  /** column name */
  AvgHrv = 'avg_hrv',
  /** column name */
  AwakeS = 'awake_s',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  DeepSleepS = 'deep_sleep_s',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  Id = 'id',
  /** column name */
  LightSleepS = 'light_sleep_s',
  /** column name */
  RemSleepS = 'rem_sleep_s',
  /** column name */
  RestingHr = 'resting_hr',
  /** column name */
  SleepScore = 'sleep_score',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  TotalSleepS = 'total_sleep_s'
}

/** input type for updating data in table "sleep" */
export type Sleep_Set_Input = {
  avg_hrv?: InputMaybe<Scalars['float8']['input']>;
  awake_s?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  deep_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  light_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  rem_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  resting_hr?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  total_sleep_s?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Sleep_Stddev_Fields = {
  __typename?: 'sleep_stddev_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Sleep_Stddev_Pop_Fields = {
  __typename?: 'sleep_stddev_pop_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Sleep_Stddev_Samp_Fields = {
  __typename?: 'sleep_stddev_samp_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "sleep" */
export type Sleep_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sleep_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sleep_Stream_Cursor_Value_Input = {
  avg_hrv?: InputMaybe<Scalars['float8']['input']>;
  awake_s?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  deep_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  light_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  rem_sleep_s?: InputMaybe<Scalars['Int']['input']>;
  resting_hr?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  total_sleep_s?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Sleep_Sum_Fields = {
  __typename?: 'sleep_sum_fields';
  avg_hrv?: Maybe<Scalars['float8']['output']>;
  awake_s?: Maybe<Scalars['Int']['output']>;
  deep_sleep_s?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  light_sleep_s?: Maybe<Scalars['Int']['output']>;
  rem_sleep_s?: Maybe<Scalars['Int']['output']>;
  resting_hr?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  total_sleep_s?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "sleep" */
export enum Sleep_Update_Column {
  /** column name */
  AvgHrv = 'avg_hrv',
  /** column name */
  AwakeS = 'awake_s',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  DeepSleepS = 'deep_sleep_s',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  LightSleepS = 'light_sleep_s',
  /** column name */
  RemSleepS = 'rem_sleep_s',
  /** column name */
  RestingHr = 'resting_hr',
  /** column name */
  SleepScore = 'sleep_score',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  TotalSleepS = 'total_sleep_s'
}

export type Sleep_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sleep_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sleep_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sleep_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sleep_Var_Pop_Fields = {
  __typename?: 'sleep_var_pop_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Sleep_Var_Samp_Fields = {
  __typename?: 'sleep_var_samp_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Sleep_Variance_Fields = {
  __typename?: 'sleep_variance_fields';
  avg_hrv?: Maybe<Scalars['Float']['output']>;
  awake_s?: Maybe<Scalars['Float']['output']>;
  deep_sleep_s?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  light_sleep_s?: Maybe<Scalars['Float']['output']>;
  rem_sleep_s?: Maybe<Scalars['Float']['output']>;
  resting_hr?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  total_sleep_s?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "activities" */
  activities: Array<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  activities_by_pk?: Maybe<Activities>;
  /** fetch data from the table in a streaming manner: "activities" */
  activities_stream: Array<Activities>;
  /** An array relationship */
  activity_streams: Array<Activity_Streams>;
  /** An aggregate relationship */
  activity_streams_aggregate: Activity_Streams_Aggregate;
  /** fetch data from the table: "activity_streams" using primary key columns */
  activity_streams_by_pk?: Maybe<Activity_Streams>;
  /** fetch data from the table in a streaming manner: "activity_streams" */
  activity_streams_stream: Array<Activity_Streams>;
  /** fetch data from the table: "daily_hrv" */
  daily_hrv: Array<Daily_Hrv>;
  /** fetch aggregated fields from the table: "daily_hrv" */
  daily_hrv_aggregate: Daily_Hrv_Aggregate;
  /** fetch data from the table: "daily_hrv" using primary key columns */
  daily_hrv_by_pk?: Maybe<Daily_Hrv>;
  /** fetch data from the table in a streaming manner: "daily_hrv" */
  daily_hrv_stream: Array<Daily_Hrv>;
  /** fetch data from the table: "exercises" */
  exercises: Array<Exercises>;
  /** fetch aggregated fields from the table: "exercises" */
  exercises_aggregate: Exercises_Aggregate;
  /** fetch data from the table: "exercises" using primary key columns */
  exercises_by_pk?: Maybe<Exercises>;
  /** fetch data from the table in a streaming manner: "exercises" */
  exercises_stream: Array<Exercises>;
  /** fetch data from the table: "food_options" */
  food_options: Array<Food_Options>;
  /** fetch aggregated fields from the table: "food_options" */
  food_options_aggregate: Food_Options_Aggregate;
  /** fetch data from the table in a streaming manner: "food_options" */
  food_options_stream: Array<Food_Options>;
  /** fetch data from the table: "plan_requirements" */
  plan_requirements: Array<Plan_Requirements>;
  /** fetch aggregated fields from the table: "plan_requirements" */
  plan_requirements_aggregate: Plan_Requirements_Aggregate;
  /** fetch data from the table: "plan_requirements" using primary key columns */
  plan_requirements_by_pk?: Maybe<Plan_Requirements>;
  /** fetch data from the table in a streaming manner: "plan_requirements" */
  plan_requirements_stream: Array<Plan_Requirements>;
  /** fetch data from the table: "plan_workouts" */
  plan_workouts: Array<Plan_Workouts>;
  /** fetch aggregated fields from the table: "plan_workouts" */
  plan_workouts_aggregate: Plan_Workouts_Aggregate;
  /** fetch data from the table: "plan_workouts" using primary key columns */
  plan_workouts_by_pk?: Maybe<Plan_Workouts>;
  /** fetch data from the table in a streaming manner: "plan_workouts" */
  plan_workouts_stream: Array<Plan_Workouts>;
  /** fetch data from the table: "plans" */
  plans: Array<Plans>;
  /** fetch aggregated fields from the table: "plans" */
  plans_aggregate: Plans_Aggregate;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table in a streaming manner: "plans" */
  plans_stream: Array<Plans>;
  /** fetch data from the table: "sleep" */
  sleep: Array<Sleep>;
  /** fetch aggregated fields from the table: "sleep" */
  sleep_aggregate: Sleep_Aggregate;
  /** fetch data from the table: "sleep" using primary key columns */
  sleep_by_pk?: Maybe<Sleep>;
  /** fetch data from the table in a streaming manner: "sleep" */
  sleep_stream: Array<Sleep>;
  /** fetch data from the table: "training_readiness" */
  training_readiness: Array<Training_Readiness>;
  /** fetch aggregated fields from the table: "training_readiness" */
  training_readiness_aggregate: Training_Readiness_Aggregate;
  /** fetch data from the table: "training_readiness" using primary key columns */
  training_readiness_by_pk?: Maybe<Training_Readiness>;
  /** fetch data from the table in a streaming manner: "training_readiness" */
  training_readiness_stream: Array<Training_Readiness>;
};


export type Subscription_RootActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activities_Order_By>>;
  where?: InputMaybe<Activities_Bool_Exp>;
};


export type Subscription_RootActivities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activities_Order_By>>;
  where?: InputMaybe<Activities_Bool_Exp>;
};


export type Subscription_RootActivities_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootActivities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Activities_Bool_Exp>;
};


export type Subscription_RootActivity_StreamsArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


export type Subscription_RootActivity_Streams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Activity_Streams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Activity_Streams_Order_By>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


export type Subscription_RootActivity_Streams_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootActivity_Streams_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Activity_Streams_Stream_Cursor_Input>>;
  where?: InputMaybe<Activity_Streams_Bool_Exp>;
};


export type Subscription_RootDaily_HrvArgs = {
  distinct_on?: InputMaybe<Array<Daily_Hrv_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Daily_Hrv_Order_By>>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};


export type Subscription_RootDaily_Hrv_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Daily_Hrv_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Daily_Hrv_Order_By>>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};


export type Subscription_RootDaily_Hrv_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootDaily_Hrv_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Daily_Hrv_Stream_Cursor_Input>>;
  where?: InputMaybe<Daily_Hrv_Bool_Exp>;
};


export type Subscription_RootExercisesArgs = {
  distinct_on?: InputMaybe<Array<Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercises_Order_By>>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};


export type Subscription_RootExercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercises_Order_By>>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};


export type Subscription_RootExercises_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootExercises_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Exercises_Stream_Cursor_Input>>;
  where?: InputMaybe<Exercises_Bool_Exp>;
};


export type Subscription_RootFood_OptionsArgs = {
  distinct_on?: InputMaybe<Array<Food_Options_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Food_Options_Order_By>>;
  where?: InputMaybe<Food_Options_Bool_Exp>;
};


export type Subscription_RootFood_Options_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Options_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Food_Options_Order_By>>;
  where?: InputMaybe<Food_Options_Bool_Exp>;
};


export type Subscription_RootFood_Options_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Food_Options_Stream_Cursor_Input>>;
  where?: InputMaybe<Food_Options_Bool_Exp>;
};


export type Subscription_RootPlan_RequirementsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


export type Subscription_RootPlan_Requirements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Requirements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Requirements_Order_By>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


export type Subscription_RootPlan_Requirements_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootPlan_Requirements_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Plan_Requirements_Stream_Cursor_Input>>;
  where?: InputMaybe<Plan_Requirements_Bool_Exp>;
};


export type Subscription_RootPlan_WorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


export type Subscription_RootPlan_Workouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plan_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plan_Workouts_Order_By>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


export type Subscription_RootPlan_Workouts_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootPlan_Workouts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Plan_Workouts_Stream_Cursor_Input>>;
  where?: InputMaybe<Plan_Workouts_Bool_Exp>;
};


export type Subscription_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootPlans_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootPlans_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootPlans_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Plans_Stream_Cursor_Input>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootSleepArgs = {
  distinct_on?: InputMaybe<Array<Sleep_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sleep_Order_By>>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};


export type Subscription_RootSleep_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sleep_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sleep_Order_By>>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};


export type Subscription_RootSleep_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootSleep_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sleep_Stream_Cursor_Input>>;
  where?: InputMaybe<Sleep_Bool_Exp>;
};


export type Subscription_RootTraining_ReadinessArgs = {
  distinct_on?: InputMaybe<Array<Training_Readiness_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Training_Readiness_Order_By>>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};


export type Subscription_RootTraining_Readiness_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Training_Readiness_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Training_Readiness_Order_By>>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};


export type Subscription_RootTraining_Readiness_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootTraining_Readiness_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Training_Readiness_Stream_Cursor_Input>>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "training_readiness" */
export type Training_Readiness = {
  __typename?: 'training_readiness';
  acute_load?: Maybe<Scalars['Int']['output']>;
  acwr_factor_feedback?: Maybe<Scalars['String']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Int']['output']>;
  calendar_date: Scalars['date']['output'];
  device_id?: Maybe<Scalars['bigint']['output']>;
  feedback_long?: Maybe<Scalars['String']['output']>;
  feedback_short?: Maybe<Scalars['String']['output']>;
  hrv_factor_feedback?: Maybe<Scalars['String']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Int']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Int']['output']>;
  id: Scalars['bigint']['output'];
  input_context?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  recovery_time?: Maybe<Scalars['Int']['output']>;
  recovery_time_change_phrase?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_feedback?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  sleep_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  sleep_score_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Int']['output']>;
  stress_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  timestamp: Scalars['timestamptz']['output'];
  valid_sleep?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "training_readiness" */
export type Training_Readiness_Aggregate = {
  __typename?: 'training_readiness_aggregate';
  aggregate?: Maybe<Training_Readiness_Aggregate_Fields>;
  nodes: Array<Training_Readiness>;
};

/** aggregate fields of "training_readiness" */
export type Training_Readiness_Aggregate_Fields = {
  __typename?: 'training_readiness_aggregate_fields';
  avg?: Maybe<Training_Readiness_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Training_Readiness_Max_Fields>;
  min?: Maybe<Training_Readiness_Min_Fields>;
  stddev?: Maybe<Training_Readiness_Stddev_Fields>;
  stddev_pop?: Maybe<Training_Readiness_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Training_Readiness_Stddev_Samp_Fields>;
  sum?: Maybe<Training_Readiness_Sum_Fields>;
  var_pop?: Maybe<Training_Readiness_Var_Pop_Fields>;
  var_samp?: Maybe<Training_Readiness_Var_Samp_Fields>;
  variance?: Maybe<Training_Readiness_Variance_Fields>;
};


/** aggregate fields of "training_readiness" */
export type Training_Readiness_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Training_Readiness_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Training_Readiness_Avg_Fields = {
  __typename?: 'training_readiness_avg_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "training_readiness". All fields are combined with a logical 'AND'. */
export type Training_Readiness_Bool_Exp = {
  _and?: InputMaybe<Array<Training_Readiness_Bool_Exp>>;
  _not?: InputMaybe<Training_Readiness_Bool_Exp>;
  _or?: InputMaybe<Array<Training_Readiness_Bool_Exp>>;
  acute_load?: InputMaybe<Int_Comparison_Exp>;
  acwr_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  acwr_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  calendar_date?: InputMaybe<Date_Comparison_Exp>;
  device_id?: InputMaybe<Bigint_Comparison_Exp>;
  feedback_long?: InputMaybe<String_Comparison_Exp>;
  feedback_short?: InputMaybe<String_Comparison_Exp>;
  hrv_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  hrv_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  hrv_weekly_average?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  input_context?: InputMaybe<String_Comparison_Exp>;
  level?: InputMaybe<String_Comparison_Exp>;
  recovery_time?: InputMaybe<Int_Comparison_Exp>;
  recovery_time_change_phrase?: InputMaybe<String_Comparison_Exp>;
  recovery_time_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  recovery_time_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  score?: InputMaybe<Int_Comparison_Exp>;
  sleep_history_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  sleep_history_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  sleep_score?: InputMaybe<Int_Comparison_Exp>;
  sleep_score_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  sleep_score_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  stress_history_factor_feedback?: InputMaybe<String_Comparison_Exp>;
  stress_history_factor_percent?: InputMaybe<Int_Comparison_Exp>;
  synced_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  valid_sleep?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "training_readiness" */
export enum Training_Readiness_Constraint {
  /** unique or primary key constraint on columns "timestamp", "calendar_date" */
  TrainingReadinessCalendarDateTimestampKey = 'training_readiness_calendar_date_timestamp_key',
  /** unique or primary key constraint on columns "id" */
  TrainingReadinessPkey = 'training_readiness_pkey'
}

/** input type for incrementing numeric columns in table "training_readiness" */
export type Training_Readiness_Inc_Input = {
  acute_load?: InputMaybe<Scalars['Int']['input']>;
  acwr_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  device_id?: InputMaybe<Scalars['bigint']['input']>;
  hrv_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  hrv_weekly_average?: InputMaybe<Scalars['Int']['input']>;
  recovery_time?: InputMaybe<Scalars['Int']['input']>;
  recovery_time_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  sleep_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  sleep_score_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  stress_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "training_readiness" */
export type Training_Readiness_Insert_Input = {
  acute_load?: InputMaybe<Scalars['Int']['input']>;
  acwr_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  acwr_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  device_id?: InputMaybe<Scalars['bigint']['input']>;
  feedback_long?: InputMaybe<Scalars['String']['input']>;
  feedback_short?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  hrv_weekly_average?: InputMaybe<Scalars['Int']['input']>;
  input_context?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  recovery_time?: InputMaybe<Scalars['Int']['input']>;
  recovery_time_change_phrase?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  sleep_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  sleep_score_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_score_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  stress_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  stress_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  valid_sleep?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Training_Readiness_Max_Fields = {
  __typename?: 'training_readiness_max_fields';
  acute_load?: Maybe<Scalars['Int']['output']>;
  acwr_factor_feedback?: Maybe<Scalars['String']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Int']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  device_id?: Maybe<Scalars['bigint']['output']>;
  feedback_long?: Maybe<Scalars['String']['output']>;
  feedback_short?: Maybe<Scalars['String']['output']>;
  hrv_factor_feedback?: Maybe<Scalars['String']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Int']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  input_context?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  recovery_time?: Maybe<Scalars['Int']['output']>;
  recovery_time_change_phrase?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_feedback?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  sleep_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  sleep_score_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Int']['output']>;
  stress_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Training_Readiness_Min_Fields = {
  __typename?: 'training_readiness_min_fields';
  acute_load?: Maybe<Scalars['Int']['output']>;
  acwr_factor_feedback?: Maybe<Scalars['String']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Int']['output']>;
  calendar_date?: Maybe<Scalars['date']['output']>;
  device_id?: Maybe<Scalars['bigint']['output']>;
  feedback_long?: Maybe<Scalars['String']['output']>;
  feedback_short?: Maybe<Scalars['String']['output']>;
  hrv_factor_feedback?: Maybe<Scalars['String']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Int']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  input_context?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  recovery_time?: Maybe<Scalars['Int']['output']>;
  recovery_time_change_phrase?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_feedback?: Maybe<Scalars['String']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  sleep_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  sleep_score_factor_feedback?: Maybe<Scalars['String']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Int']['output']>;
  stress_history_factor_feedback?: Maybe<Scalars['String']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  synced_at?: Maybe<Scalars['timestamptz']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "training_readiness" */
export type Training_Readiness_Mutation_Response = {
  __typename?: 'training_readiness_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Training_Readiness>;
};

/** on_conflict condition type for table "training_readiness" */
export type Training_Readiness_On_Conflict = {
  constraint: Training_Readiness_Constraint;
  update_columns?: Array<Training_Readiness_Update_Column>;
  where?: InputMaybe<Training_Readiness_Bool_Exp>;
};

/** Ordering options when selecting data from "training_readiness". */
export type Training_Readiness_Order_By = {
  acute_load?: InputMaybe<Order_By>;
  acwr_factor_feedback?: InputMaybe<Order_By>;
  acwr_factor_percent?: InputMaybe<Order_By>;
  calendar_date?: InputMaybe<Order_By>;
  device_id?: InputMaybe<Order_By>;
  feedback_long?: InputMaybe<Order_By>;
  feedback_short?: InputMaybe<Order_By>;
  hrv_factor_feedback?: InputMaybe<Order_By>;
  hrv_factor_percent?: InputMaybe<Order_By>;
  hrv_weekly_average?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  input_context?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  recovery_time?: InputMaybe<Order_By>;
  recovery_time_change_phrase?: InputMaybe<Order_By>;
  recovery_time_factor_feedback?: InputMaybe<Order_By>;
  recovery_time_factor_percent?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  sleep_history_factor_feedback?: InputMaybe<Order_By>;
  sleep_history_factor_percent?: InputMaybe<Order_By>;
  sleep_score?: InputMaybe<Order_By>;
  sleep_score_factor_feedback?: InputMaybe<Order_By>;
  sleep_score_factor_percent?: InputMaybe<Order_By>;
  stress_history_factor_feedback?: InputMaybe<Order_By>;
  stress_history_factor_percent?: InputMaybe<Order_By>;
  synced_at?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  valid_sleep?: InputMaybe<Order_By>;
};

/** primary key columns input for table: training_readiness */
export type Training_Readiness_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "training_readiness" */
export enum Training_Readiness_Select_Column {
  /** column name */
  AcuteLoad = 'acute_load',
  /** column name */
  AcwrFactorFeedback = 'acwr_factor_feedback',
  /** column name */
  AcwrFactorPercent = 'acwr_factor_percent',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  FeedbackLong = 'feedback_long',
  /** column name */
  FeedbackShort = 'feedback_short',
  /** column name */
  HrvFactorFeedback = 'hrv_factor_feedback',
  /** column name */
  HrvFactorPercent = 'hrv_factor_percent',
  /** column name */
  HrvWeeklyAverage = 'hrv_weekly_average',
  /** column name */
  Id = 'id',
  /** column name */
  InputContext = 'input_context',
  /** column name */
  Level = 'level',
  /** column name */
  RecoveryTime = 'recovery_time',
  /** column name */
  RecoveryTimeChangePhrase = 'recovery_time_change_phrase',
  /** column name */
  RecoveryTimeFactorFeedback = 'recovery_time_factor_feedback',
  /** column name */
  RecoveryTimeFactorPercent = 'recovery_time_factor_percent',
  /** column name */
  Score = 'score',
  /** column name */
  SleepHistoryFactorFeedback = 'sleep_history_factor_feedback',
  /** column name */
  SleepHistoryFactorPercent = 'sleep_history_factor_percent',
  /** column name */
  SleepScore = 'sleep_score',
  /** column name */
  SleepScoreFactorFeedback = 'sleep_score_factor_feedback',
  /** column name */
  SleepScoreFactorPercent = 'sleep_score_factor_percent',
  /** column name */
  StressHistoryFactorFeedback = 'stress_history_factor_feedback',
  /** column name */
  StressHistoryFactorPercent = 'stress_history_factor_percent',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  ValidSleep = 'valid_sleep'
}

/** input type for updating data in table "training_readiness" */
export type Training_Readiness_Set_Input = {
  acute_load?: InputMaybe<Scalars['Int']['input']>;
  acwr_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  acwr_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  device_id?: InputMaybe<Scalars['bigint']['input']>;
  feedback_long?: InputMaybe<Scalars['String']['input']>;
  feedback_short?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  hrv_weekly_average?: InputMaybe<Scalars['Int']['input']>;
  input_context?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  recovery_time?: InputMaybe<Scalars['Int']['input']>;
  recovery_time_change_phrase?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  sleep_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  sleep_score_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_score_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  stress_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  stress_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  valid_sleep?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Training_Readiness_Stddev_Fields = {
  __typename?: 'training_readiness_stddev_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Training_Readiness_Stddev_Pop_Fields = {
  __typename?: 'training_readiness_stddev_pop_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Training_Readiness_Stddev_Samp_Fields = {
  __typename?: 'training_readiness_stddev_samp_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "training_readiness" */
export type Training_Readiness_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Training_Readiness_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Training_Readiness_Stream_Cursor_Value_Input = {
  acute_load?: InputMaybe<Scalars['Int']['input']>;
  acwr_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  acwr_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  calendar_date?: InputMaybe<Scalars['date']['input']>;
  device_id?: InputMaybe<Scalars['bigint']['input']>;
  feedback_long?: InputMaybe<Scalars['String']['input']>;
  feedback_short?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  hrv_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  hrv_weekly_average?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  input_context?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  recovery_time?: InputMaybe<Scalars['Int']['input']>;
  recovery_time_change_phrase?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  recovery_time_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  sleep_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  sleep_score?: InputMaybe<Scalars['Int']['input']>;
  sleep_score_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  sleep_score_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  stress_history_factor_feedback?: InputMaybe<Scalars['String']['input']>;
  stress_history_factor_percent?: InputMaybe<Scalars['Int']['input']>;
  synced_at?: InputMaybe<Scalars['timestamptz']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
  valid_sleep?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Training_Readiness_Sum_Fields = {
  __typename?: 'training_readiness_sum_fields';
  acute_load?: Maybe<Scalars['Int']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Int']['output']>;
  device_id?: Maybe<Scalars['bigint']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Int']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  recovery_time?: Maybe<Scalars['Int']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Int']['output']>;
  sleep_score?: Maybe<Scalars['Int']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Int']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "training_readiness" */
export enum Training_Readiness_Update_Column {
  /** column name */
  AcuteLoad = 'acute_load',
  /** column name */
  AcwrFactorFeedback = 'acwr_factor_feedback',
  /** column name */
  AcwrFactorPercent = 'acwr_factor_percent',
  /** column name */
  CalendarDate = 'calendar_date',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  FeedbackLong = 'feedback_long',
  /** column name */
  FeedbackShort = 'feedback_short',
  /** column name */
  HrvFactorFeedback = 'hrv_factor_feedback',
  /** column name */
  HrvFactorPercent = 'hrv_factor_percent',
  /** column name */
  HrvWeeklyAverage = 'hrv_weekly_average',
  /** column name */
  InputContext = 'input_context',
  /** column name */
  Level = 'level',
  /** column name */
  RecoveryTime = 'recovery_time',
  /** column name */
  RecoveryTimeChangePhrase = 'recovery_time_change_phrase',
  /** column name */
  RecoveryTimeFactorFeedback = 'recovery_time_factor_feedback',
  /** column name */
  RecoveryTimeFactorPercent = 'recovery_time_factor_percent',
  /** column name */
  Score = 'score',
  /** column name */
  SleepHistoryFactorFeedback = 'sleep_history_factor_feedback',
  /** column name */
  SleepHistoryFactorPercent = 'sleep_history_factor_percent',
  /** column name */
  SleepScore = 'sleep_score',
  /** column name */
  SleepScoreFactorFeedback = 'sleep_score_factor_feedback',
  /** column name */
  SleepScoreFactorPercent = 'sleep_score_factor_percent',
  /** column name */
  StressHistoryFactorFeedback = 'stress_history_factor_feedback',
  /** column name */
  StressHistoryFactorPercent = 'stress_history_factor_percent',
  /** column name */
  SyncedAt = 'synced_at',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  ValidSleep = 'valid_sleep'
}

export type Training_Readiness_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Training_Readiness_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Training_Readiness_Set_Input>;
  /** filter the rows which have to be updated */
  where: Training_Readiness_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Training_Readiness_Var_Pop_Fields = {
  __typename?: 'training_readiness_var_pop_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Training_Readiness_Var_Samp_Fields = {
  __typename?: 'training_readiness_var_samp_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Training_Readiness_Variance_Fields = {
  __typename?: 'training_readiness_variance_fields';
  acute_load?: Maybe<Scalars['Float']['output']>;
  acwr_factor_percent?: Maybe<Scalars['Float']['output']>;
  device_id?: Maybe<Scalars['Float']['output']>;
  hrv_factor_percent?: Maybe<Scalars['Float']['output']>;
  hrv_weekly_average?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  recovery_time?: Maybe<Scalars['Float']['output']>;
  recovery_time_factor_percent?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  sleep_history_factor_percent?: Maybe<Scalars['Float']['output']>;
  sleep_score?: Maybe<Scalars['Float']['output']>;
  sleep_score_factor_percent?: Maybe<Scalars['Float']['output']>;
  stress_history_factor_percent?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type GeneratedInt_Comparison_Exp = {
  _eq?: number | null | undefined;
  _gt?: number | null | undefined;
  _gte?: number | null | undefined;
  _in?: Array<number> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: number | null | undefined;
  _lte?: number | null | undefined;
  _neq?: number | null | undefined;
  _nin?: Array<number> | null | undefined;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type GeneratedString_Comparison_Exp = {
  _eq?: string | null | undefined;
  _gt?: string | null | undefined;
  _gte?: string | null | undefined;
  /** does the column match the given case-insensitive pattern */
  _ilike?: string | null | undefined;
  _in?: Array<string> | null | undefined;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: string | null | undefined;
  _is_null?: boolean | null | undefined;
  /** does the column match the given pattern */
  _like?: string | null | undefined;
  _lt?: string | null | undefined;
  _lte?: string | null | undefined;
  _neq?: string | null | undefined;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: string | null | undefined;
  _nin?: Array<string> | null | undefined;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: string | null | undefined;
  /** does the column NOT match the given pattern */
  _nlike?: string | null | undefined;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: string | null | undefined;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: string | null | undefined;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: string | null | undefined;
  /** does the column match the given SQL regular expression */
  _similar?: string | null | undefined;
};

/** input type for updating data in table "activities" */
export type GeneratedActivities_Set_Input = {
  activity_type?: string | null | undefined;
  avg_hr?: number | null | undefined;
  avg_power_w?: unknown;
  avg_speed_mps?: unknown;
  caffeine?: string | null | undefined;
  calories?: number | null | undefined;
  distance_m?: unknown;
  duration_s?: unknown;
  effort?: number | null | undefined;
  elevation_gain_m?: unknown;
  feeling?: number | null | undefined;
  focus?: string | null | undefined;
  food_after?: Array<string> | null | undefined;
  food_during?: Array<string> | null | undefined;
  garmin_activity_id?: unknown;
  hard_tries?: number | null | undefined;
  max_hr?: number | null | undefined;
  name?: string | null | undefined;
  notes?: string | null | undefined;
  start_lat?: unknown;
  start_lng?: unknown;
  start_time?: unknown;
  strength_exercises?: unknown;
  subtype?: string | null | undefined;
  synced_at?: unknown;
  weather?: string | null | undefined;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type GeneratedBigint_Comparison_Exp = {
  _eq?: unknown;
  _gt?: unknown;
  _gte?: unknown;
  _in?: Array<unknown> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: unknown;
  _lte?: unknown;
  _neq?: unknown;
  _nin?: Array<unknown> | null | undefined;
};

/** input type for updating data in table "exercises" */
export type GeneratedExercises_Set_Input = {
  categories?: Array<string> | null | undefined;
  name?: string | null | undefined;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type GeneratedNumeric_Comparison_Exp = {
  _eq?: unknown;
  _gt?: unknown;
  _gte?: unknown;
  _in?: Array<unknown> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: unknown;
  _lte?: unknown;
  _neq?: unknown;
  _nin?: Array<unknown> | null | undefined;
};

export type GeneratedPlan_Requirements_Aggregate_Bool_Exp = {
  count?: GeneratedPlan_Requirements_Aggregate_Bool_Exp_Count | null | undefined;
};

export type GeneratedPlan_Requirements_Aggregate_Bool_Exp_Count = {
  arguments?: Array<GeneratedPlan_Requirements_Select_Column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: GeneratedPlan_Requirements_Bool_Exp | null | undefined;
  predicate: GeneratedInt_Comparison_Exp;
};

/** input type for inserting array relation for remote table "plan_requirements" */
export type GeneratedPlan_Requirements_Arr_Rel_Insert_Input = {
  data: Array<GeneratedPlan_Requirements_Insert_Input>;
  /** upsert condition */
  on_conflict?: GeneratedPlan_Requirements_On_Conflict | null | undefined;
};

/** Boolean expression to filter rows from the table "plan_requirements". All fields are combined with a logical 'AND'. */
export type GeneratedPlan_Requirements_Bool_Exp = {
  _and?: Array<GeneratedPlan_Requirements_Bool_Exp> | null | undefined;
  _not?: GeneratedPlan_Requirements_Bool_Exp | null | undefined;
  _or?: Array<GeneratedPlan_Requirements_Bool_Exp> | null | undefined;
  id?: GeneratedBigint_Comparison_Exp | null | undefined;
  metric?: GeneratedString_Comparison_Exp | null | undefined;
  notes?: GeneratedString_Comparison_Exp | null | undefined;
  plan?: GeneratedPlans_Bool_Exp | null | undefined;
  plan_id?: GeneratedBigint_Comparison_Exp | null | undefined;
  sport?: GeneratedString_Comparison_Exp | null | undefined;
  target?: GeneratedNumeric_Comparison_Exp | null | undefined;
  week?: GeneratedString_Comparison_Exp | null | undefined;
};

/** unique or primary key constraints on table "plan_requirements" */
export type GeneratedPlan_Requirements_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'plan_requirements_pkey';

/** input type for inserting data into table "plan_requirements" */
export type GeneratedPlan_Requirements_Insert_Input = {
  metric?: string | null | undefined;
  notes?: string | null | undefined;
  plan?: GeneratedPlans_Obj_Rel_Insert_Input | null | undefined;
  plan_id?: unknown;
  sport?: string | null | undefined;
  target?: unknown;
  week?: string | null | undefined;
};

/** on_conflict condition type for table "plan_requirements" */
export type GeneratedPlan_Requirements_On_Conflict = {
  constraint: GeneratedPlan_Requirements_Constraint;
  update_columns?: Array<GeneratedPlan_Requirements_Update_Column>;
  where?: GeneratedPlan_Requirements_Bool_Exp | null | undefined;
};

/** select columns of table "plan_requirements" */
export type GeneratedPlan_Requirements_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'metric'
  /** column name */
  | 'notes'
  /** column name */
  | 'plan_id'
  /** column name */
  | 'sport'
  /** column name */
  | 'target'
  /** column name */
  | 'week';

/** input type for updating data in table "plan_requirements" */
export type GeneratedPlan_Requirements_Set_Input = {
  metric?: string | null | undefined;
  notes?: string | null | undefined;
  plan_id?: unknown;
  sport?: string | null | undefined;
  target?: unknown;
  week?: string | null | undefined;
};

/** update columns of table "plan_requirements" */
export type GeneratedPlan_Requirements_Update_Column =
  /** column name */
  | 'metric'
  /** column name */
  | 'notes'
  /** column name */
  | 'plan_id'
  /** column name */
  | 'sport'
  /** column name */
  | 'target'
  /** column name */
  | 'week';

export type GeneratedPlan_Workouts_Aggregate_Bool_Exp = {
  count?: GeneratedPlan_Workouts_Aggregate_Bool_Exp_Count | null | undefined;
};

export type GeneratedPlan_Workouts_Aggregate_Bool_Exp_Count = {
  arguments?: Array<GeneratedPlan_Workouts_Select_Column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: GeneratedPlan_Workouts_Bool_Exp | null | undefined;
  predicate: GeneratedInt_Comparison_Exp;
};

/** input type for inserting array relation for remote table "plan_workouts" */
export type GeneratedPlan_Workouts_Arr_Rel_Insert_Input = {
  data: Array<GeneratedPlan_Workouts_Insert_Input>;
  /** upsert condition */
  on_conflict?: GeneratedPlan_Workouts_On_Conflict | null | undefined;
};

/** Boolean expression to filter rows from the table "plan_workouts". All fields are combined with a logical 'AND'. */
export type GeneratedPlan_Workouts_Bool_Exp = {
  _and?: Array<GeneratedPlan_Workouts_Bool_Exp> | null | undefined;
  _not?: GeneratedPlan_Workouts_Bool_Exp | null | undefined;
  _or?: Array<GeneratedPlan_Workouts_Bool_Exp> | null | undefined;
  day_of_week?: GeneratedString_Comparison_Exp | null | undefined;
  description?: GeneratedString_Comparison_Exp | null | undefined;
  id?: GeneratedBigint_Comparison_Exp | null | undefined;
  plan?: GeneratedPlans_Bool_Exp | null | undefined;
  plan_id?: GeneratedBigint_Comparison_Exp | null | undefined;
  sport?: GeneratedString_Comparison_Exp | null | undefined;
  title?: GeneratedString_Comparison_Exp | null | undefined;
  week?: GeneratedString_Comparison_Exp | null | undefined;
};

/** unique or primary key constraints on table "plan_workouts" */
export type GeneratedPlan_Workouts_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'plan_workouts_pkey';

/** input type for inserting data into table "plan_workouts" */
export type GeneratedPlan_Workouts_Insert_Input = {
  day_of_week?: string | null | undefined;
  description?: string | null | undefined;
  plan?: GeneratedPlans_Obj_Rel_Insert_Input | null | undefined;
  plan_id?: unknown;
  sport?: string | null | undefined;
  title?: string | null | undefined;
  week?: string | null | undefined;
};

/** on_conflict condition type for table "plan_workouts" */
export type GeneratedPlan_Workouts_On_Conflict = {
  constraint: GeneratedPlan_Workouts_Constraint;
  update_columns?: Array<GeneratedPlan_Workouts_Update_Column>;
  where?: GeneratedPlan_Workouts_Bool_Exp | null | undefined;
};

/** select columns of table "plan_workouts" */
export type GeneratedPlan_Workouts_Select_Column =
  /** column name */
  | 'day_of_week'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'plan_id'
  /** column name */
  | 'sport'
  /** column name */
  | 'title'
  /** column name */
  | 'week';

/** input type for updating data in table "plan_workouts" */
export type GeneratedPlan_Workouts_Set_Input = {
  day_of_week?: string | null | undefined;
  description?: string | null | undefined;
  plan_id?: unknown;
  sport?: string | null | undefined;
  title?: string | null | undefined;
  week?: string | null | undefined;
};

/** update columns of table "plan_workouts" */
export type GeneratedPlan_Workouts_Update_Column =
  /** column name */
  | 'day_of_week'
  /** column name */
  | 'description'
  /** column name */
  | 'plan_id'
  /** column name */
  | 'sport'
  /** column name */
  | 'title'
  /** column name */
  | 'week';

/** Boolean expression to filter rows from the table "plans". All fields are combined with a logical 'AND'. */
export type GeneratedPlans_Bool_Exp = {
  _and?: Array<GeneratedPlans_Bool_Exp> | null | undefined;
  _not?: GeneratedPlans_Bool_Exp | null | undefined;
  _or?: Array<GeneratedPlans_Bool_Exp> | null | undefined;
  end_week?: GeneratedString_Comparison_Exp | null | undefined;
  id?: GeneratedBigint_Comparison_Exp | null | undefined;
  name?: GeneratedString_Comparison_Exp | null | undefined;
  notes?: GeneratedString_Comparison_Exp | null | undefined;
  requirements?: GeneratedPlan_Requirements_Bool_Exp | null | undefined;
  requirements_aggregate?: GeneratedPlan_Requirements_Aggregate_Bool_Exp | null | undefined;
  start_week?: GeneratedString_Comparison_Exp | null | undefined;
  workouts?: GeneratedPlan_Workouts_Bool_Exp | null | undefined;
  workouts_aggregate?: GeneratedPlan_Workouts_Aggregate_Bool_Exp | null | undefined;
};

/** unique or primary key constraints on table "plans" */
export type GeneratedPlans_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'plans_pkey';

/** input type for inserting data into table "plans" */
export type GeneratedPlans_Insert_Input = {
  end_week?: string | null | undefined;
  name?: string | null | undefined;
  notes?: string | null | undefined;
  requirements?: GeneratedPlan_Requirements_Arr_Rel_Insert_Input | null | undefined;
  start_week?: string | null | undefined;
  workouts?: GeneratedPlan_Workouts_Arr_Rel_Insert_Input | null | undefined;
};

/** input type for inserting object relation for remote table "plans" */
export type GeneratedPlans_Obj_Rel_Insert_Input = {
  data: GeneratedPlans_Insert_Input;
  /** upsert condition */
  on_conflict?: GeneratedPlans_On_Conflict | null | undefined;
};

/** on_conflict condition type for table "plans" */
export type GeneratedPlans_On_Conflict = {
  constraint: GeneratedPlans_Constraint;
  update_columns?: Array<GeneratedPlans_Update_Column>;
  where?: GeneratedPlans_Bool_Exp | null | undefined;
};

/** input type for updating data in table "plans" */
export type GeneratedPlans_Set_Input = {
  end_week?: string | null | undefined;
  name?: string | null | undefined;
  notes?: string | null | undefined;
  start_week?: string | null | undefined;
};

/** update columns of table "plans" */
export type GeneratedPlans_Update_Column =
  /** column name */
  | 'end_week'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'start_week';

export type GeneratedActivitiesSmokeQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedActivitiesSmokeQuery = { activities: Array<{ id: unknown, garmin_activity_id: unknown, name: string | null, activity_type: string | null, subtype: string | null, start_time: unknown, duration_s: unknown, distance_m: unknown }> };

export type GeneratedCalendarActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedCalendarActivitiesQuery = { activities: Array<{ id: unknown, name: string | null, activity_type: string | null, subtype: string | null, start_time: unknown, duration_s: unknown, distance_m: unknown, elevation_gain_m: unknown, feeling: number | null, effort: number | null, caffeine: string | null, focus: string | null }> };

export type GeneratedActivityDetailQueryVariables = Exact<{
  id: unknown;
}>;


export type GeneratedActivityDetailQuery = { activities_by_pk: { id: unknown, garmin_activity_id: unknown, name: string | null, activity_type: string | null, subtype: string | null, start_time: unknown, duration_s: unknown, distance_m: unknown, elevation_gain_m: unknown, avg_hr: number | null, max_hr: number | null, calories: number | null, avg_speed_mps: unknown, avg_power_w: unknown, feeling: number | null, effort: number | null, food_during: Array<string> | null, food_after: Array<string> | null, caffeine: string | null, weather: string | null, notes: string | null, focus: string | null, hard_tries: number | null, strength_exercises: unknown, activity_streams: Array<{ payload: unknown }> } | null };

export type GeneratedUpdateActivityMutationVariables = Exact<{
  id: unknown;
  set: GeneratedActivities_Set_Input;
}>;


export type GeneratedUpdateActivityMutation = { update_activities_by_pk: { id: unknown, name: string | null, subtype: string | null, feeling: number | null, effort: number | null, food_during: Array<string> | null, food_after: Array<string> | null, caffeine: string | null, weather: string | null, notes: string | null, focus: string | null, hard_tries: number | null, strength_exercises: unknown } | null };

export type GeneratedFoodOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedFoodOptionsQuery = { food_options: Array<{ value: string | null }> };

export type GeneratedExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedExercisesQuery = { exercises: Array<{ id: unknown, name: string, categories: Array<string> }> };

export type GeneratedInsertExerciseMutationVariables = Exact<{
  name: string;
  categories: Array<string> | string;
}>;


export type GeneratedInsertExerciseMutation = { insert_exercises_one: { id: unknown, name: string, categories: Array<string> } | null };

export type GeneratedUpdateExerciseMutationVariables = Exact<{
  id: unknown;
  set: GeneratedExercises_Set_Input;
}>;


export type GeneratedUpdateExerciseMutation = { update_exercises_by_pk: { id: unknown, name: string, categories: Array<string> } | null };

export type GeneratedDeleteExerciseMutationVariables = Exact<{
  id: unknown;
}>;


export type GeneratedDeleteExerciseMutation = { delete_exercises_by_pk: { id: unknown } | null };

export type GeneratedPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedPlansQuery = { plans: Array<{ id: unknown, name: string, start_week: string, end_week: string, notes: string | null }> };

export type GeneratedPlanQueryVariables = Exact<{
  id: unknown;
}>;


export type GeneratedPlanQuery = { plans_by_pk: { id: unknown, name: string, start_week: string, end_week: string, notes: string | null, requirements: Array<{ id: unknown, week: string, sport: string | null, metric: string, target: unknown, notes: string | null }>, workouts: Array<{ id: unknown, week: string, day_of_week: string, sport: string, title: string, description: string | null }> } | null };

export type GeneratedInsertPlanMutationVariables = Exact<{
  object: GeneratedPlans_Insert_Input;
}>;


export type GeneratedInsertPlanMutation = { insert_plans_one: { id: unknown } | null };

export type GeneratedUpdatePlanMutationVariables = Exact<{
  id: unknown;
  set: GeneratedPlans_Set_Input;
}>;


export type GeneratedUpdatePlanMutation = { update_plans_by_pk: { id: unknown } | null };

export type GeneratedDeletePlanMutationVariables = Exact<{
  id: unknown;
}>;


export type GeneratedDeletePlanMutation = { delete_plans_by_pk: { id: unknown } | null };

export type GeneratedInsertPlanRequirementMutationVariables = Exact<{
  object: GeneratedPlan_Requirements_Insert_Input;
}>;


export type GeneratedInsertPlanRequirementMutation = { insert_plan_requirements_one: { id: unknown } | null };

export type GeneratedUpdatePlanRequirementMutationVariables = Exact<{
  id: unknown;
  set: GeneratedPlan_Requirements_Set_Input;
}>;


export type GeneratedUpdatePlanRequirementMutation = { update_plan_requirements_by_pk: { id: unknown } | null };

export type GeneratedDeletePlanRequirementMutationVariables = Exact<{
  id: unknown;
}>;


export type GeneratedDeletePlanRequirementMutation = { delete_plan_requirements_by_pk: { id: unknown } | null };

export type GeneratedAllPlanWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GeneratedAllPlanWorkoutsQuery = { plan_workouts: Array<{ id: unknown, week: string, day_of_week: string, sport: string, title: string }> };

export type GeneratedInsertPlanWorkoutMutationVariables = Exact<{
  object: GeneratedPlan_Workouts_Insert_Input;
}>;


export type GeneratedInsertPlanWorkoutMutation = { insert_plan_workouts_one: { id: unknown } | null };

export type GeneratedUpdatePlanWorkoutMutationVariables = Exact<{
  id: unknown;
  set: GeneratedPlan_Workouts_Set_Input;
}>;


export type GeneratedUpdatePlanWorkoutMutation = { update_plan_workouts_by_pk: { id: unknown } | null };

export type GeneratedDeletePlanWorkoutMutationVariables = Exact<{
  id: unknown;
}>;


export type GeneratedDeletePlanWorkoutMutation = { delete_plan_workouts_by_pk: { id: unknown } | null };

export type GeneratedSyncActivitiesMutationVariables = Exact<{
  days?: number | null | undefined;
  maxActivities?: number | null | undefined;
}>;


export type GeneratedSyncActivitiesMutation = { syncActivities: { activities_created: number, activities_updated: number, sleep_created: number, sleep_updated: number, streams_written: number, activities_failed: number, errors: Array<string> } };


export const ActivitiesSmokeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivitiesSmoke"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"garmin_activity_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"activity_type"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"duration_s"}},{"kind":"Field","name":{"kind":"Name","value":"distance_m"}}]}}]}}]} as unknown as DocumentNode<GeneratedActivitiesSmokeQuery, GeneratedActivitiesSmokeQueryVariables>;
export const CalendarActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CalendarActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"activity_type"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"duration_s"}},{"kind":"Field","name":{"kind":"Name","value":"distance_m"}},{"kind":"Field","name":{"kind":"Name","value":"elevation_gain_m"}},{"kind":"Field","name":{"kind":"Name","value":"feeling"}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"caffeine"}},{"kind":"Field","name":{"kind":"Name","value":"focus"}}]}}]}}]} as unknown as DocumentNode<GeneratedCalendarActivitiesQuery, GeneratedCalendarActivitiesQueryVariables>;
export const ActivityDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivityDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"garmin_activity_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"activity_type"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"duration_s"}},{"kind":"Field","name":{"kind":"Name","value":"distance_m"}},{"kind":"Field","name":{"kind":"Name","value":"elevation_gain_m"}},{"kind":"Field","name":{"kind":"Name","value":"avg_hr"}},{"kind":"Field","name":{"kind":"Name","value":"max_hr"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"avg_speed_mps"}},{"kind":"Field","name":{"kind":"Name","value":"avg_power_w"}},{"kind":"Field","name":{"kind":"Name","value":"feeling"}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"food_during"}},{"kind":"Field","name":{"kind":"Name","value":"food_after"}},{"kind":"Field","name":{"kind":"Name","value":"caffeine"}},{"kind":"Field","name":{"kind":"Name","value":"weather"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"focus"}},{"kind":"Field","name":{"kind":"Name","value":"hard_tries"}},{"kind":"Field","name":{"kind":"Name","value":"strength_exercises"}},{"kind":"Field","name":{"kind":"Name","value":"activity_streams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}}]}}]}}]} as unknown as DocumentNode<GeneratedActivityDetailQuery, GeneratedActivityDetailQueryVariables>;
export const UpdateActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"activities_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_activities_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"feeling"}},{"kind":"Field","name":{"kind":"Name","value":"effort"}},{"kind":"Field","name":{"kind":"Name","value":"food_during"}},{"kind":"Field","name":{"kind":"Name","value":"food_after"}},{"kind":"Field","name":{"kind":"Name","value":"caffeine"}},{"kind":"Field","name":{"kind":"Name","value":"weather"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"focus"}},{"kind":"Field","name":{"kind":"Name","value":"hard_tries"}},{"kind":"Field","name":{"kind":"Name","value":"strength_exercises"}}]}}]}}]} as unknown as DocumentNode<GeneratedUpdateActivityMutation, GeneratedUpdateActivityMutationVariables>;
export const FoodOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FoodOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"food_options"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GeneratedFoodOptionsQuery, GeneratedFoodOptionsQueryVariables>;
export const ExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Exercises"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]}}]} as unknown as DocumentNode<GeneratedExercisesQuery, GeneratedExercisesQueryVariables>;
export const InsertExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_exercises_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]}}]} as unknown as DocumentNode<GeneratedInsertExerciseMutation, GeneratedInsertExerciseMutationVariables>;
export const UpdateExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"exercises_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_exercises_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}}]}}]} as unknown as DocumentNode<GeneratedUpdateExerciseMutation, GeneratedUpdateExerciseMutationVariables>;
export const DeleteExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_exercises_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedDeleteExerciseMutation, GeneratedDeleteExerciseMutationVariables>;
export const PlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start_week"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_week"}},{"kind":"Field","name":{"kind":"Name","value":"end_week"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<GeneratedPlansQuery, GeneratedPlansQueryVariables>;
export const PlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Plan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start_week"}},{"kind":"Field","name":{"kind":"Name","value":"end_week"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"week"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"week"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"metric"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"week"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"week"}},{"kind":"Field","name":{"kind":"Name","value":"day_of_week"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GeneratedPlanQuery, GeneratedPlanQueryVariables>;
export const InsertPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plans_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_plans_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedInsertPlanMutation, GeneratedInsertPlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plans_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_plans_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedUpdatePlanMutation, GeneratedUpdatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_plans_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedDeletePlanMutation, GeneratedDeletePlanMutationVariables>;
export const InsertPlanRequirementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPlanRequirement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plan_requirements_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_plan_requirements_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedInsertPlanRequirementMutation, GeneratedInsertPlanRequirementMutationVariables>;
export const UpdatePlanRequirementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlanRequirement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plan_requirements_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_plan_requirements_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedUpdatePlanRequirementMutation, GeneratedUpdatePlanRequirementMutationVariables>;
export const DeletePlanRequirementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlanRequirement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_plan_requirements_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedDeletePlanRequirementMutation, GeneratedDeletePlanRequirementMutationVariables>;
export const AllPlanWorkoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPlanWorkouts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan_workouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"week"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"week"}},{"kind":"Field","name":{"kind":"Name","value":"day_of_week"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GeneratedAllPlanWorkoutsQuery, GeneratedAllPlanWorkoutsQueryVariables>;
export const InsertPlanWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertPlanWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plan_workouts_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_plan_workouts_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedInsertPlanWorkoutMutation, GeneratedInsertPlanWorkoutMutationVariables>;
export const UpdatePlanWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlanWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"plan_workouts_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_plan_workouts_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedUpdatePlanWorkoutMutation, GeneratedUpdatePlanWorkoutMutationVariables>;
export const DeletePlanWorkoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePlanWorkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_plan_workouts_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GeneratedDeletePlanWorkoutMutation, GeneratedDeletePlanWorkoutMutationVariables>;
export const SyncActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"days"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"7"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxActivities"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"days"},"value":{"kind":"Variable","name":{"kind":"Name","value":"days"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxActivities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxActivities"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities_created"}},{"kind":"Field","name":{"kind":"Name","value":"activities_updated"}},{"kind":"Field","name":{"kind":"Name","value":"sleep_created"}},{"kind":"Field","name":{"kind":"Name","value":"sleep_updated"}},{"kind":"Field","name":{"kind":"Name","value":"streams_written"}},{"kind":"Field","name":{"kind":"Name","value":"activities_failed"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<GeneratedSyncActivitiesMutation, GeneratedSyncActivitiesMutationVariables>;