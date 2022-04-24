import {
    RawDataRow, Procedure, SidRouteType, StarRouteType,
    ApproachRouteType, ProcedureType, Leg, TurnDirection,
    SpeedRestrictionType, AltitudeRestrictionType,
    WaypointDescriptionValuesCol1, WaypointDescriptionValuesCol2,
    WaypointDescriptionValuesCol3, WaypointDescriptionValuesCol4, WaypointDescription, AltitudeDescription, AltitudeType } from "./app/state/procedures.model";
import { nanoid } from 'nanoid';

export class Serializer {
    public static deserializeToRawDataRow(data: string): RawDataRow[] {
        return data.trim().split("\n").map(line => Serializer.lineToRawDataRow(line));
    }

    public static deserialize(data: string): Procedure[] {
        let rowDataRows = Serializer.deserializeToRawDataRow(data);
        let procedures: Procedure[] = [];

        let currentProcedure: Procedure | null = null;
        let currentTransitionAltitude = 18000;
        for(let i = 0; i < rowDataRows.length; i++) {
            let item = rowDataRows[i];

            let key = item.type+item.route_type+item.transition_identifier+item.procedure_identifier;

            if(currentProcedure !== null && currentProcedure.id != key) {
                procedures.push(currentProcedure);
            }

            if(currentProcedure === null || currentProcedure.id !== key) {
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
                    id: key,
                    procedure_identifier: item.procedure_identifier,
                    transition_identifier: item.transition_identifier,
                    route_type: routeType,
                    type: item.type as ProcedureType,
                    legs: []
                }
            }

            let leg: Leg = {
                id: nanoid(),
                seqno: parseInt(item.seqno),
                waypoint: {
                    identifier: item.waypoint_identifier,
                    icao_code: item.waypoint_identifier_icao_code,
                    sec_code: item.waypoint_identifier_sec_code,
                    sub_code: item.waypoint_identifier_sub_code,
                },
                waypoint_description: Serializer.toWaypointDescription(item.waypoint_description_code),
                turn_direction: Serializer.toStringOrNull(item.turn_direction) as TurnDirection,
                rnp: Serializer.toNumberOrNull(item.rnp),
                path_termination: item.path_termination,
                turn_direction_valid: item.turn_direction_valid,
                recommended_navaid: {
                    identifier: item.recommended_navaid,
                    icao_code: item.recommended_navaid_icao_code,
                    sec_code: item.recommended_navaid_sec_code,
                    sub_code: item.recommended_navaid_sub_code,
                },
                arc_radius: Serializer.toNumberOrNull(item.arc_radius),
                theta: Serializer.toNumberOrNull(item.theta, 10),
                rho: Serializer.toNumberOrNull(item.rho, 10),
                magnetic_course: Serializer.toNumberOrNull(item.magnetic_course, 10),
                route_distance_holding_distance_time: Serializer.toNumberOrNull(item.route_distance_holding_distance_time, 10),
                altitude_restriction: null,
                transition_altitude: null,
                speed_restiction: null,
                vertical_angle: Serializer.toNumberOrNull(item.vertical_angle, 100),
                center_waypoint: {
                    identifier: item.center_waypoint,
                    icao_code: item.center_waypoint_icao_code,
                    sec_code: item.center_waypoint_sec_code,
                    sub_code: item.center_waypoint_sub_code,
                },
                multi_cd: item.multi_cd,
                GNS_FMS_IND: item.GNS_FMS_IND,
                RTE_QUAL_1: item.RTE_QUAL_1,
                RTE_QUAL_2: item.RTE_QUAL_2,
            };

            if (item.transition_altitude.length > 0) {
                leg.transition_altitude = parseInt(item.transition_altitude);
                currentTransitionAltitude = leg.transition_altitude;
            }

            if (item.speed_limit.length > 0) {
                leg.speed_restiction = {
                    type: item.speed_limit_description as SpeedRestrictionType,
                    speed: parseInt(item.speed_limit)
                }
            }

            if (item.altitude_1.length > 0) {
                leg.altitude_restriction = {
                    type: item.altitude_description as AltitudeRestrictionType,
                    altitude_1: Serializer.toAltitudeDescription(item.altitude_1, currentTransitionAltitude),
                    altitude_2: Serializer.toAltitudeDescriptionOrNull(item.altitude_2, currentTransitionAltitude)
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
            type: parts[0].split(":")[0],
            seqno: parts[0].split(":")[1],
            route_type: parts[1],
            procedure_identifier: parts[2],
            transition_identifier: parts[3],
            waypoint_identifier: parts[4],
            waypoint_identifier_icao_code: parts[5],
            waypoint_identifier_sec_code: parts[6],
            waypoint_identifier_sub_code: parts[7],
            waypoint_description_code: parts[8],
            turn_direction: parts[9],
            rnp: parts[10],
            path_termination: parts[11],
            turn_direction_valid: parts[12],
            recommended_navaid: parts[13],
            recommended_navaid_icao_code: parts[14],
            recommended_navaid_sec_code: parts[15],
            recommended_navaid_sub_code: parts[16],
            arc_radius: parts[17],
            theta: parts[18],
            rho: parts[19],
            magnetic_course: parts[20],
            route_distance_holding_distance_time: parts[21],
            altitude_description: parts[22],
            altitude_1: parts[23],
            altitude_2: parts[24],
            transition_altitude: parts[25],
            speed_limit_description: parts[26],
            speed_limit: parts[27],
            vertical_angle: parts[28],
            not_specified: parts[29],
            center_waypoint: parts[30],
            center_waypoint_icao_code: parts[31],
            center_waypoint_sec_code: parts[32],
            center_waypoint_sub_code: parts[33],
            multi_cd: parts[34],
            GNS_FMS_IND: parts[35],
            RTE_QUAL_1: parts[36],
            RTE_QUAL_2: parts[37],
        }

        return rowDataRow;
    }

    private static toAltitudeDescriptionOrNull(input: string, transition_altitude: number) : AltitudeDescription | null {
        input = input.trim();

        if (input.length === 0) {
            return null;
        }

        return Serializer.toAltitudeDescription(input, transition_altitude)
    }

    private static toAltitudeDescription(input: string, transition_altitude: number) : AltitudeDescription {
        input = input.trim();
        let inputNumber = parseInt(input);

        if(input.startsWith("FL")) {
            return {
                type: AltitudeType.FL,
                value: parseInt(input.substr(2))
            }
        } else if(inputNumber >= transition_altitude) {
            return {
                type: AltitudeType.FL,
                value: (inputNumber / 100)
            }
        } else {
            return {
                type: AltitudeType.ALTITUDE,
                value: inputNumber
            }
        }
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

    private static toWaypointDescription(descriptionCode: string) : WaypointDescription {
        let retValue: WaypointDescription = {
            col1: null,
            col2: null,
            col3: null,
            col4: null,
        };

        if(descriptionCode.length >= 1) {
            retValue.col1 = Serializer.toStringOrNull(descriptionCode[0]) as WaypointDescriptionValuesCol1 | null;
        }
        if(descriptionCode.length >= 2) {
            retValue.col2 = Serializer.toStringOrNull(descriptionCode[1]) as WaypointDescriptionValuesCol2 | null;
        }
        if(descriptionCode.length >= 3) {
            retValue.col3 = Serializer.toStringOrNull(descriptionCode[2]) as WaypointDescriptionValuesCol3 | null;
        }
        if(descriptionCode.length === 4) {
            retValue.col4 = Serializer.toStringOrNull(descriptionCode[3]) as WaypointDescriptionValuesCol4 | null;
        }

        return retValue;

        /*return {
            col1: Serializer.toStringOrNull(item.waypoint_description_code[0]) as WaypointDescriptionValuesCol1 | null,
            col2: Serializer.toStringOrNull(item.waypoint_description_code[1]) as WaypointDescriptionValuesCol2 | null,
            col3: Serializer.toStringOrNull(item.waypoint_description_code[2]) as WaypointDescriptionValuesCol3 | null,
            col4: Serializer.toStringOrNull(item.waypoint_description_code[3]) as WaypointDescriptionValuesCol4 | null,
        }*/
    }
}