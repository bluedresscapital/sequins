import argparse
import os
import sys
from jinja2 import Template

COMPONENTS_ROOT = "./src/components"
ACTIONS_ROOT = "./src/actions"
REDUCERS_ROOT = "./src/reducers"

def create_component(component_name, component_dir):
    with open("./gen_component/component.tpl", "r") as tpl:
        t = Template(tpl.read())
        component = t.render(component_name=component_name)

    component_full_dir = os.path.join(COMPONENTS_ROOT, component_dir)
    if not os.path.exists(component_full_dir):
        os.mkdir(component_full_dir)
    component_path = os.path.join(component_full_dir, "{}.tsx".format(component_name))
    with open(component_path, "w") as f:
        f.write(component)

def create_redux(name):
    action_path = os.path.join(ACTIONS_ROOT, "{}.ts".format(name))
    reducer_path = os.path.join(REDUCERS_ROOT, "{}.ts".format(name))
    with open("./gen_component/reducer.tpl", "r") as tpl:
        t = Template(tpl.read())
        reducer = t.render(name=name)
        with open(reducer_path, "w") as rf:
            rf.write(reducer)

    with open("./gen_component/action.tpl", "r") as tpl:
        action = tpl.read()
        with open(action_path, "w") as af:
            af.write(action)

    actions = [action.split(".")[0] for action in os.listdir(ACTIONS_ROOT) if "index" not in action and ".ts" in action]
    with open("./gen_component/action_index.tpl", "r") as tpl:
        t = Template(tpl.read())
        action_idx = t.render(actions=actions, exports=", ".join(actions))
        with open(os.path.join(ACTIONS_ROOT, "index.ts"), "w") as af:
            af.write(action_idx)

    reducers = [reducer.split(".")[0] for reducer in os.listdir(REDUCERS_ROOT) if "index" not in reducer and ".ts" in reducer]
    with open("./gen_component/reducer_index.tpl", "r") as tpl:
        t = Template(tpl.read())
        reducer_idx = t.render(reducers=reducers)
        with open(os.path.join(REDUCERS_ROOT, "index.ts"), "w") as rf:
            rf.write(reducer_idx)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Generates react component hooked up with redux')
    parser.add_argument(
        "-t",
        "--type",
        required=False,
        default="component",
        help="Type of file to be generated, i.e. component, redux"
    )
    parser.add_argument(
        "-d",
        "--component-dir",
        required=False,
        default=".",
        help="Directory to store the generated component (root is src/component)"
    )
    parser.add_argument(
        "-n",
        "--name",
        required=True,
        help="Name of component"
    )
    args = parser.parse_args()
    if args.type == "component":
        create_component(args.name, args.component_dir)
    elif args.type == "redux":
        create_redux(args.name)
    else:
        print("Invalid type: " + args.type)
