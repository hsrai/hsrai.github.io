# API
## Overview

The current API is a lightweight Python wrapper around the SQLite database generated from the Shabados `database` repository.

It provides:

* Database connection
* SQL execution
* Gurbani text search

It does not yet expose higher-level concepts like Shabad, Ang, Raag, Bani, etc.

---

# Folder structure

```text
Pammi/
│
├── api/
│   ├── settings.ini
│   ├── config.py
│   ├── database.py
│   ├── gurbani.py
│   ├── test.py
│
└── database/
    └── dist/
        master.sqlite
```

---

# Configuration

`settings.ini`

```ini
[database]
type=sqlite
database=../database/dist/master.sqlite
```

Only this file needs changing if the database location changes.

---

# Database class

```python
from database import Database
```

Creates a connection to SQLite.

Example:

```python
from database import Database

with Database() as db:
    rows = db.query("SELECT COUNT(*) AS c FROM lines")
    print(rows)
```

---

## query()

Execute a SELECT statement.

```python
rows = db.query(sql, parameters)
```

Returns

```python
list[dict]
```

Example

```python
rows = db.query(
    "SELECT * FROM lines LIMIT 10"
)
```

---

## query_one()

Returns exactly one row.

```python
row = db.query_one(
    "SELECT * FROM lines LIMIT 1"
)
```

Returns

```python
dict
```

or

```python
None
```

---

# Gurbani class

```python
from gurbani import Gurbani
```

Uses Database internally.

Example

```python
with Gurbani() as g:
    ...
```

---

## search_text()

Search Gurbani text.

Syntax

```python
search_text(text,
            asset="SSA2")
```

Parameters

text

Example

```text
"ਨਾਨਕ"
```

asset

Default

```text
SSA2
```

---

Example

```python
with Gurbani() as g:

    rows = g.search_text("ਬੰਦਨਾ ਹਰਿ")

    print(rows)
```

Output

```python
[
 {
   'line_id':'HZT1',
   'line_group_id':'ER6',
   'ang':683,
   'line':19,
   'data':'ਬੰਦਨਾ ਹਰਿ ਬੰਦਨਾ...'
 }
]
```

---

Search by another word

```python
with Gurbani() as g:

    rows = g.search_text("ਨਾਨਕ")

    for row in rows:
        print(row)
```

---

# SQL available

Nothing prevents running your own SQL.

Example

```python
with Database() as db:

    rows = db.query("""
        SELECT
            asset_id,
            data
        FROM asset_lines
        WHERE line_id=?
    """,
    ("HZT1",))

    print(rows)
```

---

# Return values

Every function returns

```python
list[dict]
```

Each dictionary contains column names.

Example

```python
{
    "line_id":"HZT1",
    "ang":683,
    "line":19,
    "data":"..."
}
```

---

# Current limitations

Not yet implemented:

```text
get_shabad()

get_line()

get_ang()

get_author()

get_raag()

get_section()

get_source()

get_bani()

get_translation()

get_assets()

get_dictionary()

previous_line()

next_line()

previous_ang()

next_ang()

hukamnama(date)

larivaar()

padched()

to_json()

to_html()
```

---

# Example program

```python
from gurbani import Gurbani

with Gurbani() as g:

    rows = g.search_text("ਬੰਦਨਾ ਹਰਿ")

    for row in rows:

        print(f"Ang : {row['ang']}")
        print(f"Line: {row['line']}")
        print(row["data"])
```

Output

```
Ang : 683
Line: 19

ਬੰਦਨਾ ਹਰਿ ਬੰਦਨਾ...
```

---

## To Do

If you need functionality that isn't exposed yet, the most practical approach is often to write the SQL query directly using `Database.query()` or `Database.query_one()`. If used often, then convert into named methods; like:
- `get_shabad()`
- `get_ang()`
