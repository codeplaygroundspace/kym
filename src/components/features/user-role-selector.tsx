"use client";

interface UserRoleSelectorProps {
  selectedRole: "patient" | "practitioner";
  onRoleChange: (role: "patient" | "practitioner") => void;
}

const UserRoleSelector = ({
  selectedRole,
  onRoleChange,
}: UserRoleSelectorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div>
      <div className="bg-gray-100 rounded-2xl p-0.5 flex">
        <button
          onClick={() => onRoleChange("patient")}
          onKeyDown={(e) => handleKeyDown(e, () => onRoleChange("patient"))}
          className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            selectedRole === "patient"
              ? "bg-white text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
          aria-pressed={selectedRole === "patient"}
          tabIndex={0}
        >
          <div className="text-center">
            <div className="font-medium">Patient</div>
            <div className="text-[10px] opacity-75">Patients/Carers</div>
          </div>
        </button>
        <button
          onClick={() => onRoleChange("practitioner")}
          onKeyDown={(e) =>
            handleKeyDown(e, () => onRoleChange("practitioner"))
          }
          className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            selectedRole === "practitioner"
              ? "bg-white text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
          aria-pressed={selectedRole === "practitioner"}
          tabIndex={0}
        >
          <div className="text-center">
            <div className="font-medium">Practitioner</div>
            <div className="text-[10px] opacity-75">Licensed practitioners</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserRoleSelector;
