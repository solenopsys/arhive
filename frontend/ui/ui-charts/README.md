## UIMATRIX Charts Library.

*@solenopsys/ui-charts*

Charts module for UIMATRIX framework.

This module is based on the echarts library because it is the most powerful open source library and has a flexible
configuration system.

### Rules

- Don't use the echarts library directly in your modules. Any use should be done through the ui-charts components.
- Don't use configuration from source code. Any configurations should stay in JSON files.
- Use the based configuration from the ui-charts library. It is necessary because it is necessary to have a single
  style diagram for any external modules.
