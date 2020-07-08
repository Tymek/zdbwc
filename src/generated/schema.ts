import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
  json: any;
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "session" */
  delete_session?: Maybe<Session_Mutation_Response>;
  /** delete single row from the table: "session" */
  delete_session_by_pk?: Maybe<Session>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** insert data into the table: "session" */
  insert_session?: Maybe<Session_Mutation_Response>;
  /** insert a single row into the table: "session" */
  insert_session_one?: Maybe<Session>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** perform the action: "login" */
  login?: Maybe<UserInfo>;
  /** update data of the table: "session" */
  update_session?: Maybe<Session_Mutation_Response>;
  /** update single row of the table: "session" */
  update_session_by_pk?: Maybe<Session>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_SessionArgs = {
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Session_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_SessionArgs = {
  objects: Array<Session_Insert_Input>;
  on_conflict?: Maybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Session_OneArgs = {
  object: Session_Insert_Input;
  on_conflict?: Maybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUpdate_SessionArgs = {
  _set?: Maybe<Session_Set_Input>;
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Session_By_PkArgs = {
  _set?: Maybe<Session_Set_Input>;
  pk_columns: Session_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "session" */
  session: Array<Session>;
  /** fetch aggregated fields from the table: "session" */
  session_aggregate: Session_Aggregate;
  /** fetch data from the table: "session" using primary key columns */
  session_by_pk?: Maybe<Session>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** query root */
export type Query_RootSessionArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** query root */
export type Query_RootSession_AggregateArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** query root */
export type Query_RootSession_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "session" */
export type Session = {
  __typename?: 'session';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  end: Scalars['timestamptz'];
  id: Scalars['uuid'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  speaker?: Maybe<Scalars['String']>;
  start: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "session" */
export type Session_Aggregate = {
  __typename?: 'session_aggregate';
  aggregate?: Maybe<Session_Aggregate_Fields>;
  nodes: Array<Session>;
};

/** aggregate fields of "session" */
export type Session_Aggregate_Fields = {
  __typename?: 'session_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Session_Max_Fields>;
  min?: Maybe<Session_Min_Fields>;
};


/** aggregate fields of "session" */
export type Session_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Session_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "session" */
export type Session_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Session_Max_Order_By>;
  min?: Maybe<Session_Min_Order_By>;
};

/** input type for inserting array relation for remote table "session" */
export type Session_Arr_Rel_Insert_Input = {
  data: Array<Session_Insert_Input>;
  on_conflict?: Maybe<Session_On_Conflict>;
};

/** Boolean expression to filter rows from the table "session". All fields are combined with a logical 'AND'. */
export type Session_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Session_Bool_Exp>>>;
  _not?: Maybe<Session_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Session_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  end?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  speaker?: Maybe<String_Comparison_Exp>;
  start?: Maybe<Timestamptz_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "session" */
export enum Session_Constraint {
  /** unique or primary key constraint */
  SessionPkey = 'session_pkey'
}

/** input type for inserting data into table "session" */
export type Session_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  speaker?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Session_Max_Fields = {
  __typename?: 'session_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  speaker?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "session" */
export type Session_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  speaker?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Session_Min_Fields = {
  __typename?: 'session_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  speaker?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "session" */
export type Session_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  speaker?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "session" */
export type Session_Mutation_Response = {
  __typename?: 'session_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Session>;
};

/** input type for inserting object relation for remote table "session" */
export type Session_Obj_Rel_Insert_Input = {
  data: Session_Insert_Input;
  on_conflict?: Maybe<Session_On_Conflict>;
};

/** on conflict condition type for table "session" */
export type Session_On_Conflict = {
  constraint: Session_Constraint;
  update_columns: Array<Session_Update_Column>;
  where?: Maybe<Session_Bool_Exp>;
};

/** ordering options when selecting data from "session" */
export type Session_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  speaker?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "session" */
export type Session_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "session" */
export enum Session_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  End = 'end',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  Speaker = 'speaker',
  /** column name */
  Start = 'start',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "session" */
export type Session_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  speaker?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "session" */
export enum Session_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  End = 'end',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  Speaker = 'speaker',
  /** column name */
  Start = 'start',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "session" */
  session: Array<Session>;
  /** fetch aggregated fields from the table: "session" */
  session_aggregate: Session_Aggregate;
  /** fetch data from the table: "session" using primary key columns */
  session_by_pk?: Maybe<Session>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** subscription root */
export type Subscription_RootSessionArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSession_AggregateArgs = {
  distinct_on?: Maybe<Array<Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Session_Order_By>>;
  where?: Maybe<Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSession_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  password: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  username: Scalars['String'];
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  password?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

export type UserInfo = {
  __typename?: 'UserInfo';
  id: Scalars['uuid'];
  username: Scalars['String'];
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};


