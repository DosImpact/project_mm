try:
    import sys
    import json
    import FinanceDataReader as fdr

    df1 = fdr.DataReader("005930", '2020-01-01', '2021-04-12')
    df1 = df1.reset_index()
    parsed = df1.to_json(orient="split")
    print(json.dumps(parsed, indent=4))
    print(0)
    print(parsed)
    sys.exit(0)
except:
    pass
finally:
    print(-1)
    sys.exit(-1)

