port module Main exposing (main)

import Json.Encode as E
import Time


port changeCountBy : (Int -> msg) -> Sub msg


port modelChanged : E.Value -> Cmd msg


type alias Flags =
    { count : Int
    , currentTimePosix : Int
    }


type alias Model =
    { count : Int
    , currentTime : Time.Posix
    }


type Msg
    = ChangeCountBy Int
    | UseTime Time.Posix


encodeModel : Model -> E.Value
encodeModel model =
    E.object
        [ ( "count", E.int model.count )
        , ( "currentTimePosix", E.int <| Time.posixToMillis model.currentTime )
        ]


commandModel : Model -> ( Model, Cmd Msg )
commandModel model =
    ( model, model |> encodeModel |> modelChanged )


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { count = flags.count
      , currentTime = Time.millisToPosix flags.currentTimePosix
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newModel =
            case msg of
                ChangeCountBy i ->
                    { model
                        | count = model.count + i
                    }

                UseTime posix ->
                    { model
                        | currentTime = posix
                    }
    in
    commandModel newModel


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ changeCountBy ChangeCountBy
        , Time.every (1 * 1000) UseTime
        ]


main : Program Flags Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }
