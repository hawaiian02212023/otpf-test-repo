App version: v0.2.0b
4:50 PM 2/17/2023

Note: 

(New):
 --- Fix styling of the component.
 --- Supports new alert type [WARNING]
 --- Supports blocking of posting data when pattern is not recognized. (see supported patterns below).

(From previous):
 --- This version maps the scenario to a specific dummy json data.
The dummy json data is then being used as an argument when posting the data
to the local_server.

[PATTERNS]
Currently there are (4) supported scenarios. The following are the combination
required to achieve a specific scenario.
scenarioA: { business: "地ならし", operatingConditions: "安全優先"},
scenarioB: { business: "地ならし", operatingConditions: "業務優先"},
scenarioC: { business: "運搬", operatingConditions: "安全優先"},
scenarioD: { business: "運搬", operatingConditions: "業務優先"},

Note: the patterns are yet to be finalized at this version.

DEPENDENCIES installed (manually)
 1. react-hook-form
 2. react-query
 3. mui/icons-material
 4. mui/material
 5. emotion/react
 6. emotion/styled
 7. axios

CONTAINS
 1. Layout (responsive up to 320px screen)
 2. Submit Form data to local_server (localhost:4000) 
    - you can change the API endpoint via the api resource in the project
      (~/src/api)
 3. Integrated w/ local_server current local_server port that is mapped is PORT 4000
 4. Popup notification display
    - sucess / error / warning
 5. UI is semantically coded.
 6. Updated UI version based from previous review.
   - removed usecase input
   - exitCondition is now a combobox
 7. Added comments on each scripts.
 8. Cleaned version from previous. (removed obsolete functions, etc...)
 9. Mapped JSON output using dummy json in dummy_post_scenario.js

-- END --