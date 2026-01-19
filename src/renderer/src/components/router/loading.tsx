import FuzzyText from '@/components/FuzzyText'

export function LoadingLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <FuzzyText>Loading</FuzzyText>
    </div>
  )
}

export function DefaulLoadingComponent() {
  return (
    <div className="flex size-full items-center justify-center">
      <FuzzyText>Loading</FuzzyText>
    </div>
  )
}
