import math
def get_comb(total_cnt, num_1):
    results = []
    for i in range(0, int(math.pow(2, total_cnt))):
        binary = bin(i)
        num_of_1 = len([ones for ones in binary[2:] if ones == '1'])
        if num_of_1 == num_1:
            results.append("{0:b}".format(i).zfill(total_cnt))
    return results



aa = get_comb(9, 6)

print(aa)
print(len(aa))