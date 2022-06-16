import { OpcionPregunta } from "./opcion-pregunta.model"

export interface PreguntaOpcion {
    idPregunta:string
    tipoPreg:string
    numPreg:string
    textoPreg:string
    opcionespregunta:OpcionPregunta[]
}
