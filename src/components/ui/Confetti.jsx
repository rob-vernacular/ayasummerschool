import ConfettiExplosion from './ConfettiExplosion'

/* Spec-named wrapper. `active` triggers a burst; `count` defaults to 60
   (use 20 for smaller activity-completion moments). Auto-removes itself. */
export default function Confetti({ active = false, count = 60, onComplete }) {
  return <ConfettiExplosion active={active} count={count} onComplete={onComplete} />
}
