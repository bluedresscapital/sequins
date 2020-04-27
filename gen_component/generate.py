import argparse
import os
import sys
from jinja2 import Template

def create_component(component_name, component_dir):
    with open("./gen_component/component_template.tpl", "r") as tpl:
        t = Template(tpl.read())
        component = t.render(component_name=component_name)

    component_path = os.path.join(component_dir, "{}.tsx".format(component_name))
    with open(component_path, "w") as f:
        f.write(component)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Generates react component hooked up with redux')
    parser.add_argument(
        "-d",
        "--component-dir",
        required=True,
        help="Directory to store the generated component"
    )

    parser.add_argument(
        "-n",
        "--component-name",
        required=True,
        help="Name of component"
    )
    args = parser.parse_args()
    create_component(args.component_name, args.component_dir)
