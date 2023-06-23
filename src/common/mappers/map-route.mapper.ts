import { IMapRouteRequestDTO } from '@interfaces/dto/requests/map-route.interface.dto';
import { IMapRoute } from '@interfaces/models/map-route.interface';
import { MapRouteModel } from '@common/models/map-route';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';
import { IMapRouteResponseDTO } from '@interfaces/dto/responses/map-route.interface.dto';

const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export class MapRouteMapper {

    static toMapRoute(mapRouteDTO: IMapRouteRequestDTO): IMapRoute {
        return new MapRouteModel({
            ...mapRouteDTO,
        });
    }

    static toIMapRouteResponseDTO(mapRoute: IMapRoute): IMapRouteResponseDTO {

        let rateMeanValue = 0;

        if (mapRoute.rates && mapRoute.rates.length > 0) {
            let totalRateValue = 0;
            mapRoute.rates.forEach(rate => {
                totalRateValue += rate.value;
            });

            rateMeanValue = totalRateValue / mapRoute.rates.length;
        }

        return {
            id: mapRoute._id.toString(),
            name: mapRoute.name,
            imageUrls: mapRoute.imageUrls || [],
            distance: mapRoute.distance,
            travelTimeInMinutes: mapRoute.travelTimeInMinutes,
            author: mapRoute.author,
            isVerified: mapRoute.isVerified,
            description: mapRoute.description || '',
            direction: mapRoute.direction,
            rateMeanValue: rateMeanValue || 0
        };
    }

    static toIMapRouteShortResponseDTO(mapRoute: IMapRoute): IMapRouteShortResponseDTO {
            return {
                id: mapRoute._id.toString(),
                name: mapRoute.name,
                distanceInKm: getRandomNumber(1, 5),
                rateMeanValue: getRandomNumber(1, 5),
                isVerified: mapRoute.isVerified
            };
    }
}
