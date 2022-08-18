import json


# open mesh coords
with open("../data/mesh_coord.json") as fp:
    coords = json.load(fp)

# open mesh top
with open("../data/mesh_top.json") as fp:
    top = json.load(fp)

# open color
# with open("../data/color_values.json") as fp:
#     colors = json.load(fp)

# create color values
colors = [[1, 0, 0]] * len(top)

with open("../data/color_values.json", 'w', encoding='utf-8') as fp:
    json.dump(colors, fp, ensure_ascii=True, indent=4)

# print(colors)
# for i in range(len(top)):

print(f'no coords: {len(coords)}')
print(f'no elems: {len(top)}')
print(f'no colors: {len(colors)}')

# with open("../data/mesh_top.json") as fp:
#   values = json.load(fp)

# min_value = min(values)
# max_value = max(values)
# diff_max_min = max_value - min_value

# # 0. normalize values
# normalized_values = [(value - min_value) / diff_max_min for value in values]

# values_path = "/normalized_values.json" ## your path variable

# json.dump(normalized_values, codecs.open(values_path, 'w', encoding='utf-8'), 
#           separators=(',', ':'), 
#           sort_keys=True, 
#           indent=4) ### this saves the array in .json format

# # 1. define gradient color
# no_colors = 5
# grad_colors = [   
#   	[ 0, 0, 1 ],  # 1. blue
#   	[ 0, 1, 1 ],  # 2. cyan
#   	[ 0, 1, 0 ],  # 3. green
#   	[ 1, 1, 0 ],  # 4. yellow
#   	[ 1, 0, 0 ]   # 5. red
# ]

# # 2. get colors
# colors = []

# for value in normalized_values:
#   fractBetween = 0

#   if value <= 0: 
#     idx1 = idx2 = 0
#   elif value >= 1:
#     idx1 = idx2 = no_colors - 1
#   else:
#     value = value*(no_colors-1)
#     idx1 = math.floor(value)
#     idx2 = idx1+1
#     fractBetween = value - idx1
    
#   red   = (grad_colors[idx2][0]-grad_colors[idx1][0])*fractBetween+grad_colors[idx1][0]
#   green = (grad_colors[idx2][1]-grad_colors[idx1][1])*fractBetween+grad_colors[idx1][1]
#   blue  = (grad_colors[idx2][2]-grad_colors[idx1][2])*fractBetween+grad_colors[idx1][2]
#   colors.append([red, green, blue])

# values_path = "/color_values.json" ## your path variable

# json.dump(colors, codecs.open(values_path, 'w', encoding='utf-8'), 
#           separators=(',', ':'), 
#           sort_keys=True, 
#           indent=4) ### this saves the array in .json format
