import json
import convert
import db

def page_processing(jsonObject):
  
    data=convert.transform(jsonObject)
    connection = db.connect_to_pg("datasheets")
    categories=data["categories"]
    db.insert_products(connection, data["products"],categories["category"]["id"],categories["filter"]["id"])
    db.insert_category(connection, categories["category"])
    db.insert_filter(connection, categories["filter"], categories["category"]["id"])
    db.insert_fields(connection, data["fields"])
    db.insert_dictionaries_groups(connection, data["groups"])
    connection.close()


def process_row():
    connection = db.connect_to_pg("parsing")
    id,data=db.get_nex_page(connection)
    if id is None:
        return False
    print("processing page",id)
    page_processing(data)
    db.set_processed(connection, id)
    connection.close()
    return True
    