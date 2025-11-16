import L, { type LatLngExpression } from "leaflet"

export class TSMarker extends L.Marker {
    declare options: L.MarkerOptions
    declare inGamePoint: number[]

    constructor(inGamePoint: number[], latLng: LatLngExpression, options?: L.MarkerOptions) {
        super(latLng, options)
        this.inGamePoint = inGamePoint
    }

    greet(): this {
        this.bindPopup("Hello! TSX here!")
        return this
    }

}
