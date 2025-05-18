srcMan() {
  src4Dir="$HOME/building/pages-source/src4Man"
  NC='\033[0m'
  BLUE='\033[1;94m'
  GREEN='\033[1;92m'
  RED='\033[1;91m'

  echo -e "\n${BLUE}Choose A Function(s)${NC}"
  if [[ -d "$src4Dir" ]]; then
    scripts=("$src4Dir"/*)
    i=1
    for script in "${scripts[@]}"; do
      echo -e "    ${GREEN}$i${NC} $(basename "$script")"
      ((i++))
    done

  else
    echo "Directory $src4Dir not found"
    return 1
  fi

  echo -e "${BLUE}Enter Choice(s) separated by space${GREEN}:${NC} "
  read -r -a choices

  for choice in "${choices[@]}"; do
    if ! [[ "$choice" =~ ^[0-9]+$ ]] || ((choice < 1)) || ((choice > ${#scripts[@]})); then
      echo "${RED}Invalid choice: $choice${NC}"
      continue
    fi

    selected_script="${scripts[choice - 1]}"
    echo -e "${GREEN}=================================================================${NC}"
    echo -e "Running script ${GREEN}$choice $(basename "$selected_script")${NC}"
    bash "$selected_script"
  done
}
srcMan
