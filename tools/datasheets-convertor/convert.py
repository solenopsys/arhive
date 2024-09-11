
def extract_category(categories):
    result = {}
    for item in categories:
        if 'category' in item['url']:
            key, id = item['url'].split('/')[-2:]
            result['category'] = {   'id': id,   'key': key, 'name': item['label']   }
        elif 'filter' in item['url']:
            key, id = item['url'].split('/')[-2:]
            result['filter'] = { 'id': id,  'key': key, 'name': item['label']  }
    return result


def extract_product(product):
    cleaned = {}

    name=product["productNumber"]
    cleaned["name"]=name
    cleaned["description"]=product["description"]
    cleaned["datasheet"]=product["datasheetUrl"]
    manufacturer=product["manufacturer"]
    cleaned["manufacturer"]=manufacturer["value"]["label"]
    if "url" in manufacturer["value"]:
        cleaned["manufacturer_key"]=manufacturer["value"]["url"].split('/')[-1]
    return cleaned

def extract_price(prices):

    cleaned = {}
    for price in prices:
        if "unitPrice" in price:
            cleaned[price["quantity"]]=price["unitPrice"]

    return cleaned    

def extract_products(products):

    cleanedProducts=[]
    for group in products:
        cleanedProduct={}
        cleanedProduct["params"]={}
        for item in group:
            if item["type"] == "productDetail":
                 cleanedProduct["product"]=extract_product(item["value"])
            if item["type"] == "unitPrice":
                 cleanedProduct["prices"]=extract_price(item["value"])
            if item["type"] == "string":
                 cleanedProduct["params"][item["id"]]=item["value"]["value"]  
            pass
        cleanedProducts.append(cleanedProduct)
    return cleanedProducts


def extract_dicts(filters):
    types = {"Manufacturer":"manufacturer","Mounting Type":"mount", "Package / Case":"case","Packaging":"packaging","Type":"type"}
    result = {}
    for filter in filters:
        label=filter["label"]
  

        if label in types:
            group = []
            for option in filter["options"] : 
                item={"name":option["text"],"id":option["key"]}
                group.append(item)
            result[types[filter["label"]]]=group
           
    return result
  

def transform(jsonObject):      
    result={}      
    dataGroup=jsonObject["data"]         
    result["products"]=extract_products(dataGroup["products"])
    result["categories"]=extract_category(dataGroup["breadcrumb"])
    result["fields"]=fields=dataGroup["productHeaders"]
    result["groups"]=manufacturers=extract_dicts(dataGroup["filters"])
    return result




  
