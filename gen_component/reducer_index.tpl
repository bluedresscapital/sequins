// Auto-Generated from gen_component. DO NOT EDIT MANUALLY
import { combineReducers } from 'redux'
{% for reducer in reducers%}import {{reducer}} from './{{reducer}}';
{% endfor %}

const sequinsApp = combineReducers({
  {% for reducer in reducers%}{{ reducer }}, {% endfor %}
})

export default sequinsApp