# Plana design system

## Direction

Plana is a focused Kanban workspace for teams and individuals. The visual language should feel like a calm engineering workspace: direct, structured, technical, and fast. The interface should communicate progress and clarity rather than novelty or feature density.

## Theme tokens

The landing and auth shells use the shared `.landing-shell` token system in `app/globals.css`.

### Dark mode (default)

- Background: `#10110f`
- Panel: `#171815`
- Strong panel: `#1d1e1b`
- Line: `#302f2a`
- Text: `#f5f4ee`
- Muted text: `#a3a39a`
- Primary orange: `#ff7619`
- Soft orange: `#321d11`

### Light mode

Light mode is warm rather than pure white. Keep primary content high contrast:

- Background: `#f7f4ee`
- Panel: `#fffdf8`
- Strong panel: `#ebe6dc`
- Line: `#b9b4a9`
- Text: `#171613`
- Muted text: `#47443d`
- Primary orange: `#d95405`

Use `var(--landing-text)` for primary content and `var(--landing-muted)` for supporting content. Avoid low-opacity gray text in light mode.

## Geometry and components

- Prefer square or minimally rounded surfaces. Product cards, forms, buttons, and auth panels should use sharp corners.
- Use 1px borders with `var(--landing-line)` to create structure.
- Use orange sparingly for actions, active states, labels, progress, and focus.
- Use mono text for metadata, section numbers, status labels, and technical annotations.
- Use generous spacing and clear hierarchy instead of decorative density.
- Keep interactive states obvious: orange border, orange text, or a small orange marker.

## Typography

- Headings: existing Montserrat font with tight tracking, strong weight, and compact line-height.
- Body: Montserrat, readable and relaxed.
- Metadata: `font-mono`, uppercase where useful, small size, and increased letter spacing.

## 3D and visual depth

3D effects should be CSS-native and restrained. The hero workspace uses perspective tilt, a translated depth plate, and a soft orange glow. Keep the effect disabled or simplified on small screens. Avoid glassmorphism, excessive blur, and rounded floating blobs.

## Auth pages

Sign-in and sign-up retain Clerk for all authentication behavior and redirects. The surrounding shell should use the same theme as the landing page. Clerk appearance overrides should use the landing tokens, square cards and inputs, orange primary buttons, and visible field labels.

## Implementation notes for agents

- Reuse `ThemeToggle` from `app/(marketing)/_components/theme-toggle.tsx` when a shell needs theme switching.
- Do not introduce a second orange palette or a separate auth visual language.
- Keep authentication routes functional; change appearance only unless the task explicitly requests flow changes.
- Do not add AI assistants, chat, CRM, document editors, social features, or full calendars.
