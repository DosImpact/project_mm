import sys
import json
import FinanceDataReader as fdr


args = sys.argv[1:]

if len(args) != 3:
    print(-1)
    print("[args Error] args must have 3 ")
    sys.exit(0)

code, start_date, end_date = args

df1 = fdr.DataReader(code, start_date, end_date)
df1 = df1.reset_index()
result = df1.to_json(orient="split")

print(0)
print(result)

sys.exit(0)
