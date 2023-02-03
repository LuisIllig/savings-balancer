import requests
from main import Position


url = 'http://127.0.0.1:8000/positions/'


def test_positions():
    positions = [Position(cm=100, gp=20), Position(cm=100, gp=80)]
    positions = [p.dict() for p in positions]
    response = requests.post(url, json=positions)
    assert response.json() == [{'cp': 50.0, 'cm': 100.0, 'gp': 20.0, 'gm': 40.0, 'diff': -60.0},
                               {'cp': 50.0, 'cm': 100.0, 'gp': 80.0, 'gm': 160.0, 'diff': 60.0}]
