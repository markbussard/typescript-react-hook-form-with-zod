import { RegistrationForm } from "./registration-form";

export default function App() {
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex min-h-full justify-center items-center">
          <div className="container block pt-32 pb-8">
            <div className="flex flex-col items-center">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
