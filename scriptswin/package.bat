cd collection
for /D %%G in ("*") do (echo %%G && cd %%G && kgrid package && cd ..)
