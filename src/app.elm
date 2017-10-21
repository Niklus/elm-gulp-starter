module BeginningElm exposing (..)

import Html exposing (Html, button, div, text, h1, p)
import Html.Events exposing (onClick)


main =
  Html.beginnerProgram { model = model, view = view, update = update }


-- MODEL

type alias Model = Int

model : Model
model =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ 
      h1 [] [ text "elm" ],
      p [] [ text "A functional language that compiles to JavaScript" ],
      button [ onClick Increment ] [ text "+" ], 
      div [] [ text (toString model) ], 
      button [ onClick Decrement ] [ text "-" ]
    ]


   

