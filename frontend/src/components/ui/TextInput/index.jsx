export function TextInput({ placeholder, icon: Icon }) {
    return (
        <div className="relative w-full">
            {Icon && (
                <Icon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-dark"
                    size={42}
                    strokeWidth={2}
                />
            )}
            <input
                type="text"
                className="bg-base-input rounded-lg p-3 pl-16 outline-none focus:ring-3 text-xl focus:ring-purple-dark placeholder:text-xl placeholder:font-medium w-full font-medium"
                placeholder={placeholder}
            />
        </div>
    )
}