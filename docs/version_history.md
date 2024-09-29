# beta-1.0 (7/2/24)
* Implement functional editors for `user_data, quest_wall_list, summon_ticket_list, material_list, weapon_list, ability_crest_list`.

# beta-1.1 (9/3/24)
* Implement functional editors for `chara_list`, `dragon_list`, `talisman_list`.
* Implement readonly view for `fort_bonus_list`.
* Add savedata repair system.
* Add savedata export validation system.
* Add error boundary.
* Remove references to dragalialost.wiki images
* Add header with app title and GitHub link.
* Add icons to each savedata list accordion.
* Add weapon skin handling for crafting new weapons.
* Add save editor infos (version, author) to exported save data.
* Some other minor issues...

# beta-1.2 (9/4/24)
* Fix issue in weapons list where selected template dragon and selected element type could be mismatched
* Fix editor state rendering where it could display "Unrecognized editor state"
* Handle weapon skins for unbinding and refining certain weapons
* Fix some styling in summon ticket list and materials list
* Fix unresponsive input components in UserData, MaterialList, and QuestWallList
* Fix header spacing on mobile
* Fix all image urls to be 'minty.sbs' vs 'cdn.minty.sbs'

# beta-1.2.2 (9/21/24)
* Fix issue where editor throws when quest_wall_list is empty

# beta-1.3 (9/29/24)
* Show tutorial status in "User Data"
* Make "List Max" buttons display a warning when tutorial is not maxed
* Make "List Max" buttons max the tutorial when tutorial is not maxed
* Remove Dream Summon vouchers from Summon Ticket list