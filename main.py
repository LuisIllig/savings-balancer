from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Position(BaseModel):
    cm: float
    gp: float


class Result(BaseModel):
    cp: float
    cm: float
    gp: float
    gm: float
    diff: float


@app.post("/positions/")
async def calculate_positions(positions: list[Position]) -> list[Result]:
    total = 0
    for position in positions:
        total += position.cm

    results = []
    for position in positions:
        cp = (position.cm / total) * 100
        gm = (position.gp / 100) * total
        diff = gm - position.cm
        result = Result(cp=cp, cm=position.cm, gp=position.gp, gm=gm, diff=diff)
        results.append(result)
    return results
