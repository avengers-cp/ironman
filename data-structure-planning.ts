// users/
interface User {
  firstname: string;
  lastname: string;
  email: string;
  birthDate: Date | string;
  id: string;
}

// users/{userId}/Workouts/{workoutId}/
interface Workout {
  id: string;
  name: string;
}

// exercises/{exerciseId}/
interface Exercise {
  id: string;
  name: string;
  targetedMuscles: Muscle[];
  equipment: EquipmentType;
}

// users/{userId}/workouts/{workoutId}/workoutExercises/{exerciseId}/
// Let the client sort the exercises by order when displaying them to the user.
interface WorkoutExercise {
  order: number; // the order the exercise should be done in the workout.
}

interface SuperSetExercise extends Exercise {
  order: number;
}

// users/{userId}/Workouts/{workoutId}/Exercises/{exerciseId}/sets/{setId}/
// id = number increment (1, 2, 3, 4, 5, ...)
interface ISet {
  id: number;
  reps: number;
  setType: SetType;
}

interface RegularSet extends ISet {
  setType: SetType.REGULAR;
}

interface SuperSet extends ISet {
  exercise: SuperSetExercise[];
  setType: SetType.SUPER_SET;
}

interface DropSet extends ISet {
  setType: SetType.DROP_SET;
  dropSets: ISet[];
}

enum SetType {
  REGULAR = 'regular',
  SUPER_SET = 'superSet',
  DROP_SET = 'dropSet',
}

enum SetUnit {
  SECONDS = 'seconds',
  KG = 'kgs',
  LB = 'lbs'
}

enum MainMuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  ARMS = 'arms',
  LEGS = 'legs',
  SHOULDERS = 'shoulders',
  ABS = 'abdominals'
}

interface Muscle {
  mainMuscleGroup: MainMuscleGroup;
  name: ChestMuscle | BackMuscle | ArmMuscle | LegMuscle | ShoulderMuscle | AbMuscle;
}

// full name for muscle names. Use CSS to style how they should be disapleyd (capitilized, all uppercase etc.)
// That way when these values are stored in the database, they will always be consistent
enum ChestMuscle {
  UPPER = 'upper chest',
  MIDDLE = 'middle chest',
  LOWER = 'lower chest'
}

enum BackMuscle {
  LAT = 'lateral',
  MIDDLE = 'middle back',
  LOWER = 'lower back',
  TRAPS = 'traps'
}

enum ArmMuscle {
  FOREARM = 'forearm',
  BICEP = 'bicep',
  TRICEP = 'tricep'
}

enum LegMuscle {
  HAMSTRING = 'hamstring',
  QUAD = 'quad',
  CALF = 'calf',
  GLUTES = 'glutes',
  ADDUCTORS = 'adductors',
  ABDUCTORS = 'abductors'
}

enum ShoulderMuscle {
  FRONT = 'front deltoids',
  SIDE = 'side deltoids',
  REAR = 'rear deltoids'
}

enum AbMuscle {
  UPPER = 'upper abs',
  MIDDLE = 'middle abs',
  LOWER = 'lower abs',
  OBLIQUES = 'obliques'
}

enum EquipmentType {
  MACHINE = 'machine',
  BARBELL = 'barbell',
  DUMBBELL = 'dumbbell',
  CABLE = 'cable',
  EZ_CURL_BAR = 'e-z curl bar',
  BODY = 'body only',
  OTHER = 'other',
  BANDs = 'bands',
  KETTLEBELL = 'kettlebell',
  EXERCISE_BALL = 'exercise ball',
  FOAM_ROLL = 'foam roll',
  SAND_BAG = 'sand bag'
}
