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


# try:
#     import sys
#     import json
#     import FinanceDataReader as fdr
#     args = sys.argv[1:]
#     if len(args) != 3:
#         print(-1)
#         print("[args Error] args must have 3 ")
#         sys.exit(0)
#     code, start_date, end_date = args
#     df1 = fdr.DataReader(code, start_date, end_date)
#     df1 = df1.reset_index()
#     result = df1.to_json(orient="split")
#     print(0)
#     print(result)
#     sys.exit(0)
# except Exception as e:    # 모든 예외의 에러 메시지를 출력할 때는 Exception을 사용
#     print(-1)
#     print(e)
#     exit(-1)
# finally:
#     pass