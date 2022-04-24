export interface identifiable {
    id: string
}

export interface RawDataRow {
    "type": string
    "seqno": string
    "route_type": string
    "procedure_identifier": string
    "transition_identifier": string
    "waypoint_identifier": string
    "waypoint_identifier_icao_code": string
    "waypoint_identifier_sec_code": string
    "waypoint_identifier_sub_code": string
    "waypoint_description_code": string
    "turn_direction": string
    "rnp": string
    "path_termination": string
    "turn_direction_valid": string
    "recommended_navaid": string
    "recommended_navaid_icao_code": string
    "recommended_navaid_sec_code": string
    "recommended_navaid_sub_code": string
    "arc_radius": string
    "theta": string
    "rho": string
    "magnetic_course": string
    "route_distance_holding_distance_time": string
    "altitude_description": string
    "altitude_1": string
    "altitude_2": string
    "transition_altitude": string
    "speed_limit_description": string
    "speed_limit": string
    "vertical_angle": string
    "not_specified": string
    "center_waypoint": string
    "center_waypoint_icao_code": string
    "center_waypoint_sec_code": string
    "center_waypoint_sub_code": string
    "multi_cd": string
    "GNS_FMS_IND": string
    "RTE_QUAL_1": string
    "RTE_QUAL_2": string
}

export enum SidRouteType {
    ENGINE_OUT_SID = "0",
    SID_RUNWAY_TRANSITION = "1",
    SID_OR_SID_COMMON_ROUTE = "2",
    SID_ENROUTE_TRANSITION = "3",
    RNAV_SID_RUNWAY_TRANSITION = "4",
    RNAV_SID_OR_SID_COMMON_ROUTE = "5",
    RNAV_SID_ENROUTE_TRANSITION = "6",
    FMS_SID_RUNWAY_TRANSITION = "F",
    FMS_SID_OR_SID_COMMON_ROUTE = "M",
    FMS_SID_ENROUTE_TRANSITION = "S",
    VECTOR_SID_RUNWAY_TRANSITION = "T",
    VECTOR_SID_ENROUTE_TRANSITION = "V",
}

export enum StarRouteType {
    STAR_ENROUTE_TRANSITION = "1",
    STAR_OR_STAR_COMMON_ROUTE = "2",
    STAR_RUNWAY_TRANSITION = "3",
    RNAV_STAR_ENROUTE_TRANSITION = "4",
    RNAV_STAR_OR_STAR_COMMON_ROUTE = "5",
    RNAV_STAR_RUNWAY_TRANSITION = "6",
    PROFILE_DESCENT_ENROUTE_TRANSITION = "7",
    PROFILE_DESCENT_COMMON_ROUTE = "8",
    PROFILE_DESCENT_RUNWAY_TRANSITION = "9",
    FMS_STAR_ENROUTE_TRANSITION = "F",
    FMS_STAR_OR_STAR_COMMON_ROUTE = "M",
    FMS_STAR_RUNWAY_TRANSITION = "S",
}


export enum ApproachRouteType {
    APPROACH_TRANSITION = "A",
    LOCALIZER_BACK_COURSE_APPROACH = "B",
    VORDME_APPROACH = "D",
    FMS_APPROACH = "F",
    IGS_APPROACH = "G",
    ILS_APPROACH = "I",
    GLS_APPROACH = "J",
    LOC_ONLY_APPROACH = "L",
    MLS_APPROACH = "M",
    NDB_APPROACH = "N",
    GPS_APPROACH = "P",
    NDB_DME_APPROACH = "Q",
    RNAV_APPROACH = "R",
    VOR_APPROACH_USING_VORDME_VORTAC = "S",
    TACAN_APPROACH = "T",
    SDF_APPROACH = "U",
    VOR_APPROACH = "V",
    MLS_TYPE_A_APPROACH = "W",
    LDA_APPROACH = "X",
    MLS_TYPE_B_AND_C_APPROACH = "Y",
    MISSED_APPROACH = "Z",
}

export enum ProcedureType {
    SID = "SID",
    STAR = "STAR",
    APPROACH = "APPCH",
    RUNWAY = "RWY",
    PROCEDURE_DATA = "PRDAT"
}

export interface Procedure extends identifiable {
    procedure_identifier: string,
    transition_identifier: string,
    route_type: SidRouteType|StarRouteType|ApproachRouteType|null,
    type: ProcedureType,
    legs: Leg[]
}

export enum TurnDirection {
    LEFT = "L",
    RIGHT = "R"
}

export enum SpeedRestrictionType {
    AT = "",
    MAX = "-",
    MIN = "+"
}

export interface SpeedRestriction {
    type: SpeedRestrictionType
    speed: number
}

export enum AltitudeRestrictionType {
    AT_OR_ABOVE_ALTITUDE_1 = "+",
    AT_OR_BELOW_ALTITUDE_1 = "-",
    AT_ALTITUDE_ALTITUDE_1 = "",
    BLOCK = "B",
    AT_OR_ABOVE_ALTITUDE_2 = "C",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    V = "V",
    X = "X",
    Y = "Y",
}

export interface AltitudeRestriction {
    type: AltitudeRestrictionType
    altitude_1: AltitudeDescription
    altitude_2: AltitudeDescription|null
}

export enum AltitudeType {
    ALTITUDE = "ALTITUDE",
    FL = "FL"
}

export interface AltitudeDescription {
    type: AltitudeType,
    value: number
}

export interface Waypoint {
    identifier: string
    icao_code: string
    sec_code: string
    sub_code: string
}

export enum WaypointDescriptionValuesCol1 {
    Airport_as_Waypoint = "A",
    Essential_Waypoint = "E",
    Off_Airway_Waypoint = "F",
    Runway_as_Waypoint = "G",
    Heliport_as_Waypoint = "H",
    NDB_navaid_as_Waypoint = "N",
    Phantom_Waypoint = "P",
    Non_Essential_Waypoint = "R",
    Transition_Essential_Waypoint = "T",
    VHF_Navaid_as_Waypoint = "V",
}

export enum WaypointDescriptionValuesCol2 {
    END_OF_SID_STAR_IAP_ROUTE_TYPE = "B",
    END_OF_ENROUTE_AIRWAY_OR_TERMINAL_PROCEDURE = "E",
    UNCHARTED_AIRWAY_INTERSECTION = "U",
    FLY_OVER_WAYPOINT = "Y"
}

export enum WaypointDescriptionValuesCol3 {
    UNNAMED_STEPDOWN_FIX_AFTER_FINAL_APPROACH_FIX = "A",
    UNNAMED_STEPDOWN_FIX_BEFORE_FINAL_APPROACH_FIX = "B",
    ATC_COMPULSORY_WAYPOINT = "C",
    OCEANIC_GATEWAY_WAYPOINT = "G",
    FIRST_LEG_OF_MISSED_APPROACH_PROCEDURE = "M",
    PATH_POINT_FIX = "P",
    NAMED_STEPDOWN_FIX = "S",
}

export enum WaypointDescriptionValuesCol4 {
    INITIAL_APPROACH_FIX = "A",
    INTERMEDIATE_APPROACH_FIX = "B",
    INITIAL_APPROACH_FIX_WITH_HOLDING = "C",
    INITIAL_APPROACH_WITH_FINAL_APPROACH_COURSE_FIX = "D",
    FINAL_END_POINT_FIX = "E",
    PUBLISHED_FINAL_APPROACH_FIX_OR_DATABASE_FINAL_APPROACH_FIX = "F",
    HOLDING_FIX = "H",
    FINAL_APPROACH_COURSE_FIX = "I",
    PUBLISHED_MISSED_APPROACH_POINT_FIX = "M",
}

export interface WaypointDescription {
    col1: WaypointDescriptionValuesCol1|null
    col2: WaypointDescriptionValuesCol2|null
    col3: WaypointDescriptionValuesCol3|null
    col4: WaypointDescriptionValuesCol4|null
}

export interface Leg extends identifiable {
    seqno: number
    waypoint: Waypoint
    waypoint_description: WaypointDescription
    turn_direction: TurnDirection|null
    rnp: number|null
    path_termination: string
    turn_direction_valid: string
    recommended_navaid: Waypoint
    arc_radius: number|null
    theta: number|null
    rho: number|null
    magnetic_course: number|null
    route_distance_holding_distance_time: number|null
    altitude_restriction: AltitudeRestriction|null
    transition_altitude: number|null
    speed_restiction: SpeedRestriction|null
    vertical_angle: number|null
    center_waypoint: Waypoint
    multi_cd: string
    GNS_FMS_IND: string
    RTE_QUAL_1: string
    RTE_QUAL_2: string
}