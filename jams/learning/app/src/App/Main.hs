import System.Environment
import Data.List
import Data.Either
import Data.Function
import Text.CSV

type CSVs = (CSV, CSV)
type CSVEithers = ((Either Text.Parsec.Error.ParseError CSV), (Either Text.Parsec.Error.ParseError CSV))
type CSVIOs = (IO (Either Text.Parsec.Error.ParseError CSV), IO (Either Text.Parsec.Error.ParseError CSV))
type Samples = (FilePath, FilePath)

main :: IO ()
main = print "test"

-- euclidean
-- knn
-- parseFromFiles
parseFromFiles :: Samples -> CSVIOs
parseFromFiles (training, example) = ((parseCSVFromFile training), (parseCSVFromFile example))

-- extractCSVEithers
extractCSVEithers :: CSVIOs -> CSVEithers
extractCSVEithers (training, example) = do x <- training
                                                y <- example
                                                return (x,y)
-- eithersToCSVs
eithersToCSVs :: CSVEithers -> CSVs
eithersToCSVs (training, sample) = (x, y)
                                   where
                                     x = either (error . show) id training
                                     y = either (error' . show) id example

-- vote
-- confidence
