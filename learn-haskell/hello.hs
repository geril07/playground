import Html
import Prelude hiding (even, odd, replicate)

main :: IO ()
main = putStrLn (render myHtml)

myHtml =
  html_
    "Title"
    ( ul_
        [p_ "123", p_ "321", h1_ "123"]
    )

replicate_ :: Int -> a -> [a]
replicate_ num a =
  if num <= 0
    then []
    else a : replicate_ (num - 1) a

-- even :: Int -> Bool
-- even a = if a == 0 then True else odd (a - 1)

-- even a = a == 0 || odd (a - 1)

-- odd :: Int -> Bool
-- odd a = a == 1 || even (a - 1)
