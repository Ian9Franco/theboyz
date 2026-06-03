import pathlib

path = pathlib.Path(r'd:\.CodeProjects\the-boys\components\home\CharacterRoster.tsx')
lines = path.read_text(encoding='utf-8').splitlines(keepends=True)

# Line 435 (1-indexed) = index 434 (0-indexed) = start of CharacterRoster function
rest = lines[434:]

header_lines = [
    '"use client";\r\n',
    '\r\n',
    'import { motion, AnimatePresence } from "framer-motion";\r\n',
    'import { useEffect, useState } from "react";\r\n',
    'import { CHARACTER_DETAILS, getComputedCharacters } from "@/lib/characterData";\r\n',
    '\r\n',
]

new_content = ''.join(header_lines + rest)
path.write_text(new_content, encoding='utf-8')
print(f'Done. New line count: {len(new_content.splitlines())}')
