import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score 
import json

#location,iso_code,date,total_vaccinations,daily_vaccinations,total_vaccinations_per_hundred,daily_vaccinations_per_million


# Import the data
df = pd.read_csv("./vcount.csv")
df = df[df["iso_code"] == "USA"] # Filter for USA

US_POPULATION = 330793e3 # https://www.census.gov/popclock/ @ Jan 7
start_date = pd.to_datetime(min(df["date"]))
df["days_from_start"] = (pd.to_datetime(df["date"]) - start_date).dt.days

# Sum by days
df_grouped = df.groupby(["days_from_start"])["total_vaccinations", "daily_vaccinations"].sum().reset_index() # Throw out 0s
# Scale (skip this)
#while True:
#    print(eval(input(">>> ")))

outp = []
# Regress
def reg_pred(label, col="total_vaccinations", fn=lambda x: x):
    # All first doses
    df_sub = df_grouped[df_grouped[col] > 0]
    X = fn(df_sub[col].values.reshape(-1, 1))
    y = df_sub["days_from_start"]
    reg1 = LinearRegression().fit(X, y)
    days_1 = str(np.floor(reg1.predict([[fn(US_POPULATION)]])[0]))
    # Correlation coef
    r2 = r2_score(y, reg1.predict(X))
    outp.append([label, days_1, str((pd.Timedelta(days_1 + ' d') + start_date).strftime('%m/%d/%Y')), reg1.coef_[0], r2])
 
reg_pred("Linear")
reg_pred("Natural Log", fn=lambda x: np.log(x))
reg_pred("Square Root", fn=lambda x: np.sqrt(x))

json.dump(outp, open("proj.json", "w"))

# Generate figures
dout = {}
dout["US Population"] = US_POPULATION
dout["Vaccines Administered Total"] = df["total_vaccinations"].sum()
dout["Estimated Remaining"] = US_POPULATION - df["total_vaccinations"].sum()
dout["Last Updated"] = pd.to_datetime(df["date"].iloc[-1]).strftime('%m/%d/%Y')
json.dump(dout, open("stat.json", "w"))