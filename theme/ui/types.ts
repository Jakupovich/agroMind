// @ts-nocheck
export interface AlertButton {
<<<<<<< HEAD
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
}
=======
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }
  
  export interface AlertState {
    visible: boolean;
    title: string;
    message: string;
    buttons: AlertButton[];
  }
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
