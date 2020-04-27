// Auto-Generated from gen_component. DO NOT EDIT MANUALLY
import { combineReducers } from 'redux'
{% for reducer in reducers%}import {{reducer}} from './{{reducer}}';
{% endfor %}
const sequinsApp = combineReducers({
{{ reducer_list }}
})

export default sequinsApp