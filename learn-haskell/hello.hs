import Html

main :: IO ()
main = putStrLn (render myHtml)

myHtml =
  html_
    "Title"
    ( ul_
        [p_ "123", p_ "321", h1_ "123"]
    )
