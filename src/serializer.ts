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
    RNAV_SID_ENROUTE_TRANSITION	= "6",
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

export interface Procedure {
    key: string
    procedure_identifier: string,
    transition_identifier: string,
    route_type: SidRouteType|StarRouteType|ApproachRouteType|null,
    type: ProcedureType,
    legs: Leg[]
}

export interface Waypoint {
    identifier: string
    icao_code: string
    sec_code: string
    sub_code: string
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
    altitude_1: number
    altitude_2: number|null
}

export interface Leg {
    "seqno": number
    "waypoint": Waypoint
    "waypoint_description_code": string
    "turn_direction": TurnDirection|null
    "rnp": number|null
    "path_termination": string
    "turn_direction_valid": string
    "recommended_navaid": Waypoint
    "arc_radius": number|null
    "theta": number|null
    "rho": number|null
    "magnetic_course": number|null
    "route_distance_holding_distance_time": number|null
    "altitude_restriction": AltitudeRestriction|null
    "transition_altitude": string
    "speed_restiction": SpeedRestriction|null
    "vertical_angle": number|null
    "center_waypoint": Waypoint
    "multi_cd": string
    "GNS_FMS_IND": string
    "RTE_QUAL_1": string
    "RTE_QUAL_2": string
}

export class Serializer {
    public static deserializeToRawDataRow(data: string): RawDataRow[] {
        return data.trim().split("\n").map(line => Serializer.lineToRawDataRow(line));
    }

    public static deserialize(data: string): Procedure[] {
        let rowDataRows = Serializer.deserializeToRawDataRow(data);
        let procedures: Procedure[] = [];

        let currentProcedure: Procedure | null = null;
        for(let i = 0; i < rowDataRows.length; i++) {
            let item = rowDataRows[i];

            let key = item.type+item.route_type+item.transition_identifier+item.procedure_identifier;

            if(currentProcedure !== null && currentProcedure.key != key) {
                procedures.push(currentProcedure);
            }

            if(currentProcedure === null || currentProcedure.key !== key) {
                let routeType: SidRouteType|StarRouteType|ApproachRouteType|null;

                if (item.type as ProcedureType == ProcedureType.SID) {
                    routeType = item.route_type as SidRouteType;
                } else if (item.type as ProcedureType == ProcedureType.STAR) {
                    routeType = item.route_type as StarRouteType;
                } else if (item.type as ProcedureType == ProcedureType.APPROACH) {
                    routeType = item.route_type as ApproachRouteType;
                } else {
                    routeType = null;
                }

                currentProcedure = {
                    key: key,
                    procedure_identifier: item.procedure_identifier,
                    transition_identifier: item.transition_identifier,
                    route_type: routeType,
                    type: item.type as ProcedureType,
                    legs: []
                }
            }

            let leg: Leg = {
                "seqno": parseInt(item.seqno),
                "waypoint": {
                    identifier: item.waypoint_identifier,
                    icao_code: item.waypoint_identifier_icao_code,
                    sec_code: item.waypoint_identifier_sec_code,
                    sub_code: item.waypoint_identifier_sub_code,
                },
                "waypoint_description_code": item.waypoint_description_code,
                "turn_direction": Serializer.toStringOrNull(item.turn_direction) as TurnDirection,
                "rnp": Serializer.toNumberOrNull(item.rnp),
                "path_termination": item.path_termination,
                "turn_direction_valid": item.turn_direction_valid,
                "recommended_navaid": {
                    identifier: item.recommended_navaid,
                    icao_code: item.recommended_navaid_icao_code,
                    sec_code: item.recommended_navaid_sec_code,
                    sub_code: item.recommended_navaid_sub_code,
                },
                "arc_radius": Serializer.toNumberOrNull(item.arc_radius),
                "theta": Serializer.toNumberOrNull(item.theta, 10),
                "rho": Serializer.toNumberOrNull(item.rho, 10),
                "magnetic_course": Serializer.toNumberOrNull(item.magnetic_course, 10),
                "route_distance_holding_distance_time": Serializer.toNumberOrNull(item.route_distance_holding_distance_time, 10),
                "altitude_restriction": null,
                "transition_altitude": item.transition_altitude,
                "speed_restiction": null,
                "vertical_angle": Serializer.toNumberOrNull(item.vertical_angle, 100),
                "center_waypoint": {
                    identifier: item.center_waypoint,
                    icao_code: item.center_waypoint_icao_code,
                    sec_code: item.center_waypoint_sec_code,
                    sub_code: item.center_waypoint_sub_code,
                },
                "multi_cd": item.multi_cd,
                "GNS_FMS_IND": item.GNS_FMS_IND,
                "RTE_QUAL_1": item.RTE_QUAL_1,
                "RTE_QUAL_2": item.RTE_QUAL_2,
            };

            if (item.speed_limit.length > 0) {
                leg.speed_restiction = {
                    type: item.speed_limit_description as SpeedRestrictionType,
                    speed: parseInt(item.speed_limit)
                }
            }

            if (item.altitude_1.length > 0) {
                leg.altitude_restriction = {
                    type: item.altitude_description as AltitudeRestrictionType,
                    altitude_1: parseInt(item.altitude_1),
                    altitude_2: Serializer.toNumberOrNull(item.altitude_2)
                }
            }

            currentProcedure.legs.push(leg);
        }
        if(currentProcedure !== null) {
            procedures.push(currentProcedure);
        }

        return procedures;
    }
    
    public static lineToRawDataRow(line: string): RawDataRow {
        let parts = line.split(",");
        parts = parts.map(item => item.trim());

        let rowDataRow: RawDataRow = {
            "type": parts[0].split(":")[0],
            "seqno": parts[0].split(":")[1],
            "route_type": parts[1],
            "procedure_identifier": parts[2],
            "transition_identifier": parts[3],
            "waypoint_identifier": parts[4],
            "waypoint_identifier_icao_code": parts[5],
            "waypoint_identifier_sec_code": parts[6],
            "waypoint_identifier_sub_code": parts[7],
            "waypoint_description_code": parts[8],
            "turn_direction": parts[9],
            "rnp": parts[10],
            "path_termination": parts[11],
            "turn_direction_valid": parts[12],
            "recommended_navaid": parts[13],
            "recommended_navaid_icao_code": parts[14],
            "recommended_navaid_sec_code": parts[15],
            "recommended_navaid_sub_code": parts[16],
            "arc_radius": parts[17],
            "theta": parts[18],
            "rho": parts[19],
            "magnetic_course": parts[20],
            "route_distance_holding_distance_time": parts[21],
            "altitude_description": parts[22],
            "altitude_1": parts[23],
            "altitude_2": parts[24],
            "transition_altitude": parts[25],
            "speed_limit_description": parts[26],
            "speed_limit": parts[27],
            "vertical_angle": parts[28],
            "not_specified": parts[29],
            "center_waypoint": parts[30],
            "center_waypoint_icao_code": parts[31],
            "center_waypoint_sec_code": parts[32],
            "center_waypoint_sub_code": parts[33],
            "multi_cd": parts[34],
            "GNS_FMS_IND": parts[35],
            "RTE_QUAL_1": parts[36],
            "RTE_QUAL_2": parts[37],
        }

        return rowDataRow;
    }

    private static toStringOrNull(input: string) : string|null {
        input = input.trim();

        if (input.length === 0) {
            return null;
        }

        return input;
    }

    private static toNumberOrNull(input: string, divisionBy: number = 1) : number|null {
        input = input.trim();

        if (input.length === 0) {
            return null;
        }

        return parseFloat(input) / divisionBy;
    }
}