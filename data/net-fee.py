import csv

data = []
prev = []

with open ('ArsenalTransfers.csv') as csvfile:
	reader = csv.reader(csvfile)
	headers = next(reader)
	for row in reader:
		year = int(row[0])
		if prev:
			prev_year = int(prev[0])
			if prev_year == year:
				net = int(prev[2]) - int(row[2])
				data.append([year, net, prev[8], prev[9], prev[10], prev[11], prev[12], prev[13]])
		prev = row

with open ('ChelseaTransfers.csv') as csvfile:
	reader = csv.reader(csvfile)
	headers = next(reader)
	for row in reader:
		year = int(row[0])
		if prev:
			prev_year = int(prev[0])
			if prev_year == year:
				net = int(prev[2]) - int(row[2])
				data.append([year, net, prev[8], prev[9], prev[10], prev[11], prev[12], prev[13]])
		prev = row

with open ('ManUtdTransfers.csv') as csvfile:
	reader = csv.reader(csvfile)
	headers = next(reader)
	for row in reader:
		year = int(row[0])
		if prev:
			prev_year = int(prev[0])
			if prev_year == year:
				net = int(prev[2]) - int(row[2])
				data.append([year, net, prev[8], prev[9], prev[10], prev[11], prev[12], prev[13]])
		prev = row

with open ('ManCityTransfers.csv') as csvfile:
	reader = csv.reader(csvfile)
	headers = next(reader)
	for row in reader:
		year = int(row[0])
		if prev:
			prev_year = int(prev[0])
			if prev_year == year:
				net = int(prev[2]) - int(row[2])
				data.append([year, net, prev[8], prev[9], prev[10], prev[11], prev[12], prev[13]])
		prev = row

with open ('LiverpoolTransfers.csv') as csvfile:
	reader = csv.reader(csvfile)
	headers = next(reader)
	for row in reader:
		year = int(row[0])
		if prev:
			prev_year = int(prev[0])
			if prev_year == year:
				net = int(prev[2]) - int(row[2])
				data.append([year, net, prev[8], prev[9], prev[10], prev[11], prev[12], prev[13]])
		prev = row



with open('transfers.csv', 'w') as csvfile:
	writer = csv.writer(csvfile)
	writer.writerow(['Year', 'Net', 'Team', 'Pos', 'Scored', 'Conceded', 'Diff', 'Pts'])
	writer.writerows(data)