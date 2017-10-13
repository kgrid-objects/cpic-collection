# Change the format of diplotype. Put the smaller number first.
user_input = {'allele1': '', 'allele2': '', 'diplotype': '*17/*1'}

# get diplotype
diplotype = user_input['diplotype']

list_diplotype = diplotype.split('/')
# ['*17', '*1']

a = int(list_diplotype[0].replace('*',''))
b = int(list_diplotype[1].replace('*',''))
# if the allele on the left is greater than the allele on the right, swap the order
if a > b:
    diplotype = '*' + str(b) + '/' + '*' + str(a)
else:
    diplotype

print(diplotype)
