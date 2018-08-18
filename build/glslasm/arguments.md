| ID | Name      | Type  | Notes                                                                                           |
|:---|:----------|:------|:------------------------------------------------------------------------------------------------|
| 0  | False     | Bool  |                                                                                                 |
| 1  | True      | Bool  |                                                                                                 |
| 2  | Float     | Float | The following four bytes are a little-endian float32.                                           |
| 3  | Reference | Any   | The following two bytes are a little-endian uint16, which is an instruction index to reference. |
| 4  | 0         | Float |                                                                                                 |
| 5  | 0.0001    | Float |                                                                                                 |
| 6  | 0.001     | Float |                                                                                                 |
| 7  | 0.01      | Float |                                                                                                 |
| 8  | 0.1       | Float |                                                                                                 |
| 9  | 1         | Float |                                                                                                 |
| 10 | 10        | Float |                                                                                                 |
| 11 | 100       | Float |                                                                                                 |
| 12 | 1000      | Float |                                                                                                 |
| 13 | 10000     | Float |                                                                                                 |
| 14 | 2         | Float |                                                                                                 |
| 15 | 4         | Float |                                                                                                 |
| 16 | 8         | Float |                                                                                                 |
| 17 | 16        | Float |                                                                                                 |
| 18 | 32        | Float |                                                                                                 |
| 19 | 64        | Float |                                                                                                 |
| 20 | 128       | Float |                                                                                                 |
| 21 | 0.5       | Float |                                                                                                 |
| 22 | 0.25      | Float |                                                                                                 |
| 23 | 0.125     | Float |                                                                                                 |
| 24 | 0.0625    | Float |                                                                                                 |
| 25 | 3         | Float |                                                                                                 |
| 26 | PI        | Float |                                                                                                 |
| 27 | 2PI       | Float |                                                                                                 |
| 28 | PI/2      | Float |                                                                                                 |
| 29 | -0.0001   | Float |                                                                                                 |
| 30 | -0.001    | Float |                                                                                                 |
| 31 | -0.01     | Float |                                                                                                 |
| 32 | -0.1      | Float |                                                                                                 |
| 33 | -1        | Float |                                                                                                 |
| 34 | -10       | Float |                                                                                                 |
| 35 | -100      | Float |                                                                                                 |
| 36 | -1000     | Float |                                                                                                 |
| 37 | -10000    | Float |                                                                                                 |
| 38 | -2        | Float |                                                                                                 |
| 39 | -4        | Float |                                                                                                 |
| 40 | -8        | Float |                                                                                                 |
| 41 | -16       | Float |                                                                                                 |
| 42 | -32       | Float |                                                                                                 |
| 43 | -64       | Float |                                                                                                 |
| 44 | -128      | Float |                                                                                                 |
| 45 | -0.5      | Float |                                                                                                 |
| 46 | -0.25     | Float |                                                                                                 |
| 47 | -0.125    | Float |                                                                                                 |
| 48 | -0.0625   | Float |                                                                                                 |
| 49 | -3        | Float |                                                                                                 |
| 50 | -PI       | Float |                                                                                                 |
| 51 | -2PI      | Float |                                                                                                 |
| 52 | -PI/2     | Float |                                                                                                 |
| 53 | Reference | Any   | The previous instruction.                                                                       |
| 54 | Reference | Any   | The instruction before last.                                                                    |
| 55 | Reference | Any   | Two instructions ago.                                                                           |
