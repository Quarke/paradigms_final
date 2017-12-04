import csv
import json

with open('./SvalbardGlobalSeedVault-TaxonNames.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open('test.json', 'w') as nf:
    json.dump(rows, nf)
