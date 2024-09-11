insert into datasheets (url)

select distinct (url::text)
from (select g.ds -> 'value' ->> 'datasheetUrl' as url
      from (SELECT json_array_elements(json_array_elements(payload -> 'data' -> 'products')) AS ds
            FROM pages) as g) as md
where md.url is not null

except
select url
from datasheets
;