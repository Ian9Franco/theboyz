import pathlib

path_roster = pathlib.Path(r'd:\.CodeProjects\the-boys\components\home\CharacterRoster.tsx')
lines = path_roster.read_text(encoding='utf-8').splitlines(keepends=True)

modal_start = 288 # line 289

roster_content = lines[:modal_start]
modal_content = lines[modal_start:]

path_roster.write_text("".join(roster_content), encoding='utf-8')

path_modal = pathlib.Path(r'd:\.CodeProjects\the-boys\components\home\CharacterModal.tsx')
header = [
    '"use client";\n',
    '\n',
    'import { motion, AnimatePresence } from "framer-motion";\n',
    'import { useEffect, useState } from "react";\n',
    '\n'
]

path_modal.write_text("".join(header + modal_content), encoding='utf-8')
print("Extracted CharacterModal.tsx successfully.")
