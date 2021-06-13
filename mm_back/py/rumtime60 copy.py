"""
### 변동성 MMT,MMT_TARGET 구하기
- 공식예시)
1. 전일 (고가-저가) * 0.5 를 구한다. ( MMT 명명)  
2. 금일 시가 + ( 변동폭 ) 이상이면 매수 ( MMT_target 명명)
- 주의 : 24시간이 지나면 target 은 다시 계산되어야 한다.  
- 주의 : 1일 변동성, 변동성, 변동성 돌파 지수는 다른 정의  
"""
# eg) 1h 갱신 DF 만들기 ( MMT, MMT_TARGET )
df_ETH = pybithumb.get_candlestick("ETH",chart_intervals='24h')
df_ETH["MMT"] = ((df_ETH["high"] - df_ETH["low"])/2).shift(1)
df_ETH["MMT_TARGET"] = df_ETH["open"] +  df_ETH["MMT"]
df_ETH.tail(4)
df_all = pd.DataFrame(pybithumb.get_current_price("all")["data"])
df_all = df_all.T.drop(['date'])
df_all.head(2)

df_all.loc["ETH","MMT_B"] = float(df_all.loc["ETH","closing_price"]) / df_ETH.iloc[-1]["MMT_TARGET"]
df_all
# MMT_B 1.0 이상이면 매수 신호 주기