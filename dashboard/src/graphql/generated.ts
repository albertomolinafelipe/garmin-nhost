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
  timestamptz: { input: unknown; output: unknown; }
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
  /** delete data from the table: "exercises" */
  delete_exercises?: Maybe<Exercises_Mutation_Response>;
  /** delete single row from the table: "exercises" */
  delete_exercises_by_pk?: Maybe<Exercises>;
  /** delete data from the table: "sleep" */
  delete_sleep?: Maybe<Sleep_Mutation_Response>;
  /** delete single row from the table: "sleep" */
  delete_sleep_by_pk?: Maybe<Sleep>;
  /** insert data into the table: "activities" */
  insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "activity_streams" */
  insert_activity_streams?: Maybe<Activity_Streams_Mutation_Response>;
  /** insert a single row into the table: "activity_streams" */
  insert_activity_streams_one?: Maybe<Activity_Streams>;
  /** insert data into the table: "exercises" */
  insert_exercises?: Maybe<Exercises_Mutation_Response>;
  /** insert a single row into the table: "exercises" */
  insert_exercises_one?: Maybe<Exercises>;
  /** insert data into the table: "sleep" */
  insert_sleep?: Maybe<Sleep_Mutation_Response>;
  /** insert a single row into the table: "sleep" */
  insert_sleep_one?: Maybe<Sleep>;
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
  /** update data of the table: "exercises" */
  update_exercises?: Maybe<Exercises_Mutation_Response>;
  /** update single row of the table: "exercises" */
  update_exercises_by_pk?: Maybe<Exercises>;
  /** update multiples rows of table: "exercises" */
  update_exercises_many?: Maybe<Array<Maybe<Exercises_Mutation_Response>>>;
  /** update data of the table: "sleep" */
  update_sleep?: Maybe<Sleep_Mutation_Response>;
  /** update single row of the table: "sleep" */
  update_sleep_by_pk?: Maybe<Sleep>;
  /** update multiples rows of table: "sleep" */
  update_sleep_many?: Maybe<Array<Maybe<Sleep_Mutation_Response>>>;
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
export type Mutation_RootDelete_ExercisesArgs = {
  where: Exercises_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Exercises_By_PkArgs = {
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
  /** fetch data from the table: "sleep" */
  sleep: Array<Sleep>;
  /** fetch aggregated fields from the table: "sleep" */
  sleep_aggregate: Sleep_Aggregate;
  /** fetch data from the table: "sleep" using primary key columns */
  sleep_by_pk?: Maybe<Sleep>;
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
  /** fetch data from the table: "sleep" */
  sleep: Array<Sleep>;
  /** fetch aggregated fields from the table: "sleep" */
  sleep_aggregate: Sleep_Aggregate;
  /** fetch data from the table: "sleep" using primary key columns */
  sleep_by_pk?: Maybe<Sleep>;
  /** fetch data from the table in a streaming manner: "sleep" */
  sleep_stream: Array<Sleep>;
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

export type ActivitiesSmokeQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivitiesSmokeQuery = { activities: Array<{ id: unknown, garmin_activity_id: unknown, name: string | null, activity_type: string | null, subtype: string | null, start_time: unknown, duration_s: unknown, distance_m: unknown }> };

export type FoodOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FoodOptionsQuery = { food_options: Array<{ value: string | null }> };


export const ActivitiesSmokeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivitiesSmoke"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"garmin_activity_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"activity_type"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"duration_s"}},{"kind":"Field","name":{"kind":"Name","value":"distance_m"}}]}}]}}]} as unknown as DocumentNode<ActivitiesSmokeQuery, ActivitiesSmokeQueryVariables>;
export const FoodOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FoodOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"food_options"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<FoodOptionsQuery, FoodOptionsQueryVariables>;