import psycopg2
import json

def connect_to_pg(db_name):
    return psycopg2.connect(host="localhost", database=db_name, port="30432", user="postgres", password="root")

def get_nex_page(conn):
    query = "SELECT id, payload FROM pages WHERE not processed LIMIT 1;"
    cursor = conn.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    row=rows[0]
    cursor.close()
    return row[0],row[1]

def set_processed(conn, id):
    query = "UPDATE pages SET processed=true WHERE id=%s;"
    cursor = conn.cursor()
    cursor.execute(query, (id,))
    conn.commit()
    cursor.close()

def insert_products(conn, products,category_id,filter_id):
    query = "INSERT INTO products (name, data, category_id, filter_id) VALUES (%s, %s, %s, %s) ON CONFLICT (name) DO NOTHING;"
    cursor = conn.cursor()
  
    cursor.executemany(query, [
        (product["product"]["name"],  json.dumps(product), category_id, filter_id)
        for product in products
    ])
    conn.commit()
    cursor.close()


def insert_category(conn, category):
    query = "INSERT INTO categories (id, name, title) VALUES (%s, %s, %s) ON CONFLICT (id) DO NOTHING;"
    cursor = conn.cursor()
    cursor.execute(query, (category["id"], category["key"], category["name"]))
    conn.commit()
    cursor.close()
    
def insert_filter(conn, fiter,category_id):
    query = "INSERT INTO filters (id, name, title, category_id) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO NOTHING;"
    cursor = conn.cursor()
    cursor.execute(query, (fiter["id"], fiter["key"], fiter["name"],category_id))
    conn.commit()
    cursor.close()    
    
def insert_fields(conn, fields):
    query = "INSERT INTO fields (id, label, sortable, hidable, dense) VALUES (%s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING;"
    cursor = conn.cursor()
    cursor.executemany(query, [
        (field["id"], field["label"], field["sortable"], field["hideable"], field["denseViewOnly"])
        for field in fields
    ])
    conn.commit()
    cursor.close()
    
def insert_dictionaries(conn, dictionaries,type):
    
    query = "INSERT INTO dictionaries (id, type, name) VALUES (%s, %s, %s) ON CONFLICT (id, type) DO NOTHING;"
    cursor = conn.cursor()
    cursor.executemany(query, [
        (dictionary["id"], type, dictionary["name"])
        for dictionary in dictionaries
    ])
    conn.commit()
    cursor.close()
    
def insert_dictionaries_groups(conn, dictionariesMap):
    for key in dictionariesMap:
        insert_dictionaries(conn, dictionariesMap[key],key)
