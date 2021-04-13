import sys
import json
import FinanceDataReader as fdr

args = sys.argv[1:]

df = fdr.StockListing('KOSPI')
df['Symbol']
codes = df['Symbol'].to_list()
print(codes)

print(0)
print('result')
sys.exit(0)
