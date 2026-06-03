import pathlib

reader_dir = pathlib.Path(r'd:\.CodeProjects\the-boys\components\reader')
reader_dir.mkdir(parents=True, exist_ok=True)

path_page = pathlib.Path(r'd:\.CodeProjects\the-boys\app\chapters\[id]\page.tsx')
lines = path_page.read_text(encoding='utf-8').splitlines(keepends=True)

lightbox_content = lines[7:266]
rest_content = lines[:7] + lines[266:]

path_page.write_text(''.join(rest_content), encoding='utf-8')

lightbox_path = reader_dir / 'ReaderLightbox.tsx'
header = [
    '"use client";\n',
    '\n',
    'import { motion, AnimatePresence } from "framer-motion";\n',
    'import { useEffect, useState, useRef } from "react";\n',
    '\n',
    'export '
]

lightbox_path.write_text(''.join(header) + ''.join(lightbox_content)[len('/* ── Zoom Lightbox ── */\n'):], encoding='utf-8')

print('Extracted ReaderLightbox.tsx successfully.')
